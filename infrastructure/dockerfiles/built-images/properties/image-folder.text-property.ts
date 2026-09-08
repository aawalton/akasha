import type { TextProperty } from "@akasha/pages/text-property"

export type ImageFolder = string

export const imageFolder = {
  id: "01a08193-87a3-7f04-9149-3c34246de4f2",
  pageTypeSlug: "text-property",
  slug: "image-folder",
  propertySlug: "folder",
  definition: "the folder an image is built in",
  maxLength: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
