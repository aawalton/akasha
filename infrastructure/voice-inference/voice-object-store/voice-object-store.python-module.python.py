"""The object store the finished renditions land in.

A SigV4 boto3 client for the SeaweedFS gateway and the two blocking PUTs behind
it — small whole objects, and the large multipart MP3. Both render paths write
through here.
"""

import io
import os


_S3_CLIENT = None
_MP3_TRANSFER_CONFIG = None

_MP3_MULTIPART_CHUNK_BYTES = 8 * 1024 * 1024
_MP3_MULTIPART_MAX_CONCURRENCY = 4


def _s3_client():
    """Lazily build + cache a boto3 S3 client for the SeaweedFS gateway. Path-
    style addressing — the endpoint is a bare gateway host, not a vhost. boto3 is
    imported here (not at module top) to keep the deferred-heavy-import shape."""
    global _S3_CLIENT
    if _S3_CLIENT is None:
        import boto3
        from botocore.config import Config

        _S3_CLIENT = boto3.client(
            "s3",
            endpoint_url=os.environ["SEAWEEDFS_S3_ENDPOINT"],
            aws_access_key_id=os.environ["SEAWEEDFS_ACCESS_KEY"],
            aws_secret_access_key=os.environ["SEAWEEDFS_SECRET_KEY"],
            region_name=os.environ.get("SEAWEEDFS_REGION", "us-east-1"),
            config=Config(signature_version="s3v4", s3={"addressing_style": "path"}),
        )
    return _S3_CLIENT


def _mp3_transfer_config():
    """Lazily build + cache the bounded `TransferConfig` for the finished-MP3
    multipart upload (#15753). Threshold == chunk size, so any body at/above
    `_MP3_MULTIPART_CHUNK_BYTES` is chunked (never one jumbo single-part PUT that
    the 256Mi gateway would buffer whole) and anything smaller stays single-part.
    Deferred import matches the boto3 client's deferred-heavy-import shape."""
    global _MP3_TRANSFER_CONFIG
    if _MP3_TRANSFER_CONFIG is None:
        from boto3.s3.transfer import TransferConfig

        _MP3_TRANSFER_CONFIG = TransferConfig(
            multipart_threshold=_MP3_MULTIPART_CHUNK_BYTES,
            multipart_chunksize=_MP3_MULTIPART_CHUNK_BYTES,
            max_concurrency=_MP3_MULTIPART_MAX_CONCURRENCY,
            use_threads=True,
        )
    return _MP3_TRANSFER_CONFIG


def _put_bytes_sync(key: str, body: bytes, content_type: str) -> None:
    """Blocking whole-object PUT of a SMALL object (an HLS segment or the .m3u8).
    Single-part is fine here — a segment is one budget-bounded sentence (~1MB) and
    the playlist is a few KB, so neither strains the 256Mi gateway. The large
    finished MP3 uses `_put_object_sync` (multipart) instead. Runs in the
    threadpool so the upload never blocks the event loop (and /health stays
    answerable for a busy-not-dead pod)."""
    _s3_client().put_object(
        Bucket=os.environ["SEAWEEDFS_BUCKET"],
        Key=key,
        Body=body,
        ContentType=content_type,
    )


def _put_object_sync(key: str, mp3: bytes) -> None:
    """Blocking multipart PUT of a finished MP3 (audio/mpeg). Uses boto3's managed
    uploader with a bounded `TransferConfig` so a long-chapter MP3 (100-260MB) is
    chunked into multipart parts rather than a single-part whole-object PUT that
    the SeaweedFS gateway would buffer whole in its 256Mi heap (#15753)."""
    _s3_client().upload_fileobj(
        io.BytesIO(mp3),
        os.environ["SEAWEEDFS_BUCKET"],
        key,
        ExtraArgs={"ContentType": "audio/mpeg"},
        Config=_mp3_transfer_config(),
    )
