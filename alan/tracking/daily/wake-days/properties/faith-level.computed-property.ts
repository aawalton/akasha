import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type FaithLevel = number

export const faithLevel = {
  id: "01a07211-0e16-72be-89cf-abcacd834c99",
  pageTypeSlug: "computed-property",
  slug: "faith-level",
  propertySlug: "faith-level",
  definition: "which of the four rungs the day's faith points reached",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
