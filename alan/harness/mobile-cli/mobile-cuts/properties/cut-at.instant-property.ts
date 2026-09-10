import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type CutAt = string

export const cutAt = {
  id: "01a0685d-b81f-7830-bc6d-c93c8deca340",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "cut-at",
  propertySlug: "cut-at",
  definition: "when a cut was taken",
} as const satisfies InstantProperty
