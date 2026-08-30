import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Opens = string

export const opens = {
  id: "01a05480-1c8d-7f70-bc85-af9d4d96c037",
  pageTypeSlug: "text-property",
  slug: "opens",
  propertySlug: "opens",
  definition: "where a tap on a widget goes",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
