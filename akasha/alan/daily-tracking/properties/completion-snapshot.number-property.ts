import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CompletionSnapshot = number

export const completionSnapshot = {
  id: "01a05fd8-c30f-738b-ac0a-08f015ef76e7",
  pageTypeSlug: "number-property",
  slug: "completion-snapshot",
  propertySlug: "completion-snapshot",
  definition: "the lifetime to-do rounds finished as counted on a day",
  max: null,
} as const satisfies NumberProperty
