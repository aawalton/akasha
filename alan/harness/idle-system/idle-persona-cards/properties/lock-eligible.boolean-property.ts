import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const lockEligible = {
  id: "01a06596-f0d5-7005-af86-74f559d1081d",
  type: "boolean-property",
  slug: "lock-eligible",
  propertySlug: "lock-eligible",
  definition: "whether a card could be unlocked now",
  types: "ts",
} as const satisfies BooleanProperty
