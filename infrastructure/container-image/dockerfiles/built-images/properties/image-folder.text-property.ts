import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ImageFolder = string

export const imageFolder = {
  id: "01a08193-87a3-7f04-9149-3c34246de4f2",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "image-folder",
  propertySlug: "folder",
  definition: "the folder an image is built in",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
