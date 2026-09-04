import type { TextProperty } from "@akasha/pages-system/text-property"

export type Handle = string

export const handle = {
  id: "01a06582-bd62-7728-bc8f-07ef64d9438b",
  pageTypeSlug: "text-property",
  slug: "handle",
  propertySlug: "handle",
  definition: "the account name a game was played under",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
