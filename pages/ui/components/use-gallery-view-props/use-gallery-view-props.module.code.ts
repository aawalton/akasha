import type { PropertyDefinition } from "akasha/pages/core/page-data/page-data.module.code.ts"
import type { ViewDataJSON } from "akasha/pages/core/schema/view-data/view-data.module.code.ts"
import {
  type GalleryCardSize,
  resolveGalleryCardSize,
} from "akasha/pages/core/view/gallery/gallery.module.code.ts"
import { useMemo } from "react"

export interface GalleryViewProps {
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
