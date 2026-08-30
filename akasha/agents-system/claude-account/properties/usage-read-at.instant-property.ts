import type { InstantProperty } from "../../../pages-system/instant-property/instant-property.page-type.ts"

export type UsageReadAt = string

export const usageReadAt = {
  id: "01a054d8-1d39-78e7-924b-d783a32a7b25",
  pageTypeSlug: "instant-property",
  slug: "usage-read-at",
  propertySlug: "usage-read-at",
  definition: "when the account's usage was last read",
} as const satisfies InstantProperty
