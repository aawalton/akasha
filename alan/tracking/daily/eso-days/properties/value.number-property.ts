import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Value = number

export const value = {
  id: "01a060fb-040f-736e-ae10-e365099478f6",
  pageTypeSlug: "number-property",
  slug: "value",
  propertySlug: "value",
  definition: "how much a reading measured",
  max: null,
} as const satisfies NumberProperty
