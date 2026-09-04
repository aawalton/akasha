import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type LockEligible = boolean

export const lockEligible = {
  id: "01a06596-f0d5-7005-af86-74f559d1081d",
  pageTypeSlug: "boolean-property",
  slug: "lock-eligible",
  propertySlug: "lock-eligible",
  definition: "whether a card could be unlocked now",
} as const satisfies BooleanProperty
