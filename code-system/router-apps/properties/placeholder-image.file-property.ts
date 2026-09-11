import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const placeholderImage = {
  id: "01a0817a-cc1e-7ea7-a854-76886776a1f4",
  type: "file-property",
  slug: "placeholder-image",
  propertySlug: "placeholder-image",
  definition: "the image shown where an app has no image of its own",
  extensions: ["svg"],
  fileName: "public/placeholder.svg",
  types: "ts",
} as const satisfies FileProperty
