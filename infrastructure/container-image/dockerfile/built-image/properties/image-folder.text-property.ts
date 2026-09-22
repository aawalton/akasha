import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const imageFolder = {
  id: "01a08193-87a3-7f04-9149-3c34246de4f2",
  type: "page-type/text-property",
  slug: "image-folder",
  propertySlug: "folder",
  definition: "an image's build folder",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
