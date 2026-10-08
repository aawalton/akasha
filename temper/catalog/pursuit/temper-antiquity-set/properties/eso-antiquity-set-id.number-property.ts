import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoAntiquitySetId = {
  id: "01a06176-a912-7000-8819-19b71a0dafd6",
  type: "page-type/number-property",
  slug: "eso-antiquity-set-id",
  propertySlug: "eso-antiquity-set-id",
  definition: "the number The Elder Scrolls Online gives a set of antiquity leads",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A lead set is numbered apart from the item set an item belongs to.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T09:32:41.618Z",
  updatedAt: "2026-09-24T23:48:00.000Z",
} as const satisfies NumberProperty
