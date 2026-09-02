import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoAntiquitySetId = number

export const esoAntiquitySetId = {
  id: "01a06176-a912-7000-8819-19b71a0dafd6",
  pageTypeSlug: "number-property",
  slug: "eso-antiquity-set-id",
  propertySlug: "eso-antiquity-set-id",
  definition: "the number The Elder Scrolls Online names a set of antiquity leads by",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A lead set is numbered apart from the item set an item belongs to.",
    },
  ],
} as const satisfies NumberProperty
