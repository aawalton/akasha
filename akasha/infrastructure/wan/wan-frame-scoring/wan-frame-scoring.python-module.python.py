#!/usr/bin/env python
import argparse
import contextlib
import os
import sys

import cv2
import numpy as np
from insightface.app import FaceAnalysis

IMAGE_EXTS = (".png", ".jpg", ".jpeg", ".webp")


def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument("--reference", required=True, help="reference identity image")
    p.add_argument("--frames-dir", required=True, help="directory of frames to score")
    p.add_argument("--floor", type=float, default=0.45, help="same-identity cosine floor")
    return p.parse_args()


def make_embedder():
    providers = ["CUDAExecutionProvider", "CPUExecutionProvider"]
    with contextlib.redirect_stdout(sys.stderr):
        app = FaceAnalysis(name="buffalo_l", providers=providers)
        app.prepare(ctx_id=0, det_size=(640, 640))

    def embed(path):
        img = cv2.imread(path)
        if img is None:
            return None
        faces = app.get(img)
        if not faces:
            return None
        f = max(faces, key=lambda x: (x.bbox[2] - x.bbox[0]) * (x.bbox[3] - x.bbox[1]))
        e = f.normed_embedding
        return e / (np.linalg.norm(e) + 1e-9)

    return embed


def main():
    args = parse_args()
    if not os.path.isdir(args.frames_dir):
        print(f"ERROR: frames dir not found: {args.frames_dir}", file=sys.stderr)
        return 2

    embed = make_embedder()
    ref = embed(args.reference)
    if ref is None:
        print(f"ERROR: no detectable face in reference: {args.reference}", file=sys.stderr)
        return 2

    frames = sorted(
        f for f in os.listdir(args.frames_dir) if f.lower().endswith(IMAGE_EXTS)
    )
    cosines = []
    passers = 0
    for frame in frames:
        emb = embed(os.path.join(args.frames_dir, frame))
        if emb is None:
            print(f"{frame}\tnan\t0")
            continue
        cos = float(np.dot(ref, emb))
        cosines.append(cos)
        ok = cos >= args.floor
        passers += int(ok)
        print(f"{frame}\t{cos:.4f}\t{int(ok)}")

    mean = float(np.mean(cosines)) if cosines else float("nan")
    low = float(np.min(cosines)) if cosines else float("nan")
    print(
        f"frames={len(frames)} scored={len(cosines)} mean={mean:.4f} "
        f"min={low:.4f} passers={passers} floor={args.floor}",
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
