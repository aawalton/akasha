import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { ViewDataJSON } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import {
  type GalleryCardSize,
  resolveGalleryCardSize,
} from "akasha/page/core/view/modules/gallery/gallery.module.code.ts"
import { useMemo } from "react"

interface GalleryViewProps {
  galleryCardSize?: GalleryCardSize
  galleryCoverSource?: string
  galleryCoverSourceOptions: readonly { id: string; label: string }[]
}

export function useGalleryViewProps(
  viewConfig: ViewDataJSON | undefined,
  properties: readonly PropertyDefinition[]
): GalleryViewProps {
  const galleryCoverSourceOptions = useMemo(
    () => properties.filter((p) => p.type === "url").map((p) => ({ id: p.id, label: p.title })),
    [properties]
  )
  return {
    galleryCardSize:
      viewConfig?.layout === "gallery"
        ? resolveGalleryCardSize(viewConfig?.gallery_card_size)
        : undefined,
    galleryCoverSource: viewConfig?.gallery_cover_source,
    galleryCoverSourceOptions,
  }
}
