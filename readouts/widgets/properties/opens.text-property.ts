import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Opens = string

export const opens = {
  id: "01a05480-1c8d-7f70-bc85-af9d4d96c037",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "opens",
  propertySlug: "opens",
  definition: "where a tap on a widget goes",
  maxLength: 150,
  nameFormat: null,
} as const satisfies TextProperty
