import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Handle = string

export const handle = {
  id: "01a06582-bd62-7728-bc8f-07ef64d9438b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "handle",
  propertySlug: "handle",
  definition: "the account name a game was played under",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
