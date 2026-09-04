import type { SelectProperty } from "@akasha/pages-system/select-property"

export const galleryCardSize = {
  id: "01a0680d-4d00-7011-8d69-5f1a4c7b4112",
  pageTypeSlug: "select-property",
  slug: "gallery-card-size",
  propertySlug: "gallery-card-size",
  definition: "how large a gallery draws one card",
  values: ["small", "medium", "large"],
} as const satisfies SelectProperty

export type GalleryCardSize = (typeof galleryCardSize.values)[number]
