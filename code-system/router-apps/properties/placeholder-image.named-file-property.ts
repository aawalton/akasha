import type { NamedFileProperty } from "@akasha/pages/named-file-property"

export type PlaceholderImage = "svg"

export const placeholderImage = {
  id: "01a0817a-cc1e-7ea7-a854-76886776a1f4",
  pageTypeSlug: "named-file-property",
  slug: "placeholder-image",
  propertySlug: "placeholder-image",
  definition: "the image shown where an app has no image of its own",
  fileName: "public/placeholder.svg",
} as const satisfies NamedFileProperty
