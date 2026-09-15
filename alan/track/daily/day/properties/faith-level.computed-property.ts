import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const faithLevel = {
  id: "01a07211-0e16-72be-89cf-abcacd834c99",
  type: "page-type/computed-property",
  slug: "faith-level",
  propertySlug: "faith-level",
  definition: "which of the four rungs the day's faith points reached",
  holds: "number",
  code: "ts",
  types: "ts",
} as const satisfies ComputedProperty
