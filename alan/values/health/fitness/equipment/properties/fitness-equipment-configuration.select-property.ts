import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const fitnessEquipmentConfiguration = {
  id: "01a06865-7f45-7b38-8b71-89af2d19a5a6",
  type: "select-property",
  slug: "fitness-equipment-configuration",
  propertySlug: "configuration",
  definition: "how many of a piece there are and whether its load moves",
  values: ["pair", "single", "adjustable", "n-a"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A piece with no load at all is configured n-a.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
