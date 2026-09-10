import { MEDIA_FORMATS, type Medium } from "@akasha/pages-core/media-formats"
import { mediaRenderObjectKey } from "akasha/infrastructure/storage/object-store/key/object-store-key.module.code.ts"
import type { ObjectStore } from "akasha/infrastructure/storage/object-store/seaweedfs-store/seaweedfs-store.module.code.ts"

export type AvailableRenditionsArgs = {
  pageId: string
  medium: Medium
  candidates: readonly string[]
}

export async function getAvailableRenditions(
  store: ObjectStore,
  args: AvailableRenditionsArgs
): Promise<readonly string[]> {
  const { pageId, medium, candidates } = args
  const ext = MEDIA_FORMATS[medium].ext
  const hits = await Promise.all(
    candidates.map(async (variant) =>
      (await store.head(mediaRenderObjectKey(pageId, medium, variant, ext))) !== null
        ? variant
        : null
    )
  )
  return hits.filter((v): v is string => v !== null)
}

export function pickDefaultVariant(
  narrator: string | null,
  available: readonly string[]
): string | null {
  if (narrator == null || narrator.length === 0) return null
  return available.includes(narrator) ? narrator : null
}
