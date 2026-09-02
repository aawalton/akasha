import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ExcludedGuildBankValue = number

export const excludedGuildBankValue = {
  id: "01a05fcb-fd33-7f97-99bf-49d454c2a458",
  pageTypeSlug: "number-property",
  slug: "excluded-guild-bank-value",
  propertySlug: "excluded-guild-bank-value",
  definition: "what the guild bank goods left out of a reading are worth",
  max: null,
} as const satisfies NumberProperty
