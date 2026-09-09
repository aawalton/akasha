import type { ComputedProperty } from "@akasha/pages/computed-property"

export type FunLevel = number

export const funLevel = {
  id: "01a0720f-c6fb-73f1-9066-af41bb900c1c",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "fun-level",
  propertySlug: "fun-level",
  definition: "which of the four rungs the day's fun points reached",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
