import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type NoneLeftWords = string

export const noneLeftWords = {
  id: "01a05446-e766-78e0-84fe-1fd54f474a7f",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "none-left-words",
  propertySlug: "none-left-words",
  definition: "what is shown in place of a reading of nothing",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
