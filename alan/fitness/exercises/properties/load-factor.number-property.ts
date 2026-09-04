import type { NumberProperty } from "@akasha/pages-system/number-property"

export type LoadFactor = number

export const loadFactor = {
  id: "01a0657e-2bbf-7aaa-8416-91fe9f47a3a9",
  pageTypeSlug: "number-property",
  slug: "load-factor",
  propertySlug: "load-factor",
  definition: "what share of bodyweight the movement carries, for counting volume",
  max: null,
} as const satisfies NumberProperty
