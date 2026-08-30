import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type NoneLeftWords = string

export const noneLeftWords = {
  id: "01a05446-e766-78e0-84fe-1fd54f474a7f",
  pageTypeSlug: "text-property",
  slug: "none-left-words",
  propertySlug: "none-left-words",
  definition: "what is shown in place of a reading of nothing",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
