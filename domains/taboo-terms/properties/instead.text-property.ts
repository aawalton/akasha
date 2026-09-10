import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Instead = string

export const instead = {
  id: "01a0592c-2737-77ef-8540-dbdcfc1c7521",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "instead",
  propertySlug: "instead",
  definition: "what is written in place of the term that was meant",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
