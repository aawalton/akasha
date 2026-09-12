import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const fitnessEquipmentCovers = {
  id: "01a09338-8296-7d00-8ec3-c16e1350135b",
  type: "select-property",
  slug: "fitness-equipment-covers",
  propertySlug: "covers",
  definition: "the kit a movement names that this piece answers for",
  values: [
    "bands",
    "barbell",
    "body-only",
    "cable",
    "dumbbell",
    "e-z-curl-bar",
    "exercise-ball",
    "foam-roll",
    "kettlebells",
    "machine",
    "medicine-ball",
    "other",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A piece answering for no kit a movement names covers nothing.",
    },
    {
      invariantKind: "constraint",
      statement: "The values here are the values a movement's equipment is named from.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
