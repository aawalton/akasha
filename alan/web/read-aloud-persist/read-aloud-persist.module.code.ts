import { mediaRenderObjectKey } from "@akasha/object-store/object-store-key"
import { type ObjectStore, seaweedFSObjectStoreFromEnv } from "@akasha/object-store/seaweedfs-store"
import { MEDIA_FORMATS } from "@akasha/pages-core/media-formats"
import { STORED_READ_ALOUD_VARIANT } from "@akasha/pages-ui/media/media-src"

export function readAloudKey(pageId: string, opts?: { readonly fromSentence?: number }): string {
  const n = opts?.fromSentence
  const variant =
    n != null && n > 0
      ? `${STORED_READ_ALOUD_VARIANT}.from-${Math.trunc(n)}`
      : STORED_READ_ALOUD_VARIANT
  return mediaRenderObjectKey(pageId, "audio", variant, MEDIA_FORMATS.audio.ext)
}

export async function storedReadAloudExists(
  pageId: string,
  store: ObjectStore | null = seaweedFSObjectStoreFromEnv()
): Promise<boolean> {
  if (store == null) return false
  try {
    return (await store.head(readAloudKey(pageId))) !== null
  } catch {
    return false
  }
}
