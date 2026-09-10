import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type PlaceholderImage = "svg"

export const placeholderImage = {
  id: "01a0817a-cc1e-7ea7-a854-76886776a1f4",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "placeholder-image",
  propertySlug: "placeholder-image",
  definition: "the image shown where an app has no image of its own",
  fileName: "public/placeholder.svg",
} as const satisfies FileProperty
