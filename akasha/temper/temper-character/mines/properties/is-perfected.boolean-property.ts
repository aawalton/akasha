import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsPerfected = boolean

export const isPerfected = {
  id: "01a05fcd-f54f-7ea5-92d4-5bc87371235f",
  pageTypeSlug: "boolean-property",
  slug: "is-perfected",
  propertySlug: "is-perfected",
  definition: "whether a set bonus is the perfected wording of itself",
} as const satisfies BooleanProperty
