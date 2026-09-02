import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ExcludedGuildBankValue = number

export const excludedGuildBankValue = {
  id: "01a06006-154d-7e2e-a167-9efa2ff3d358",
  pageTypeSlug: "number-property",
  slug: "excluded-guild-bank-value",
  propertySlug: "excluded-guild-bank-value",
  definition: "what the guild bank goods left out of a reading are worth",
  max: null,
} as const satisfies NumberProperty
