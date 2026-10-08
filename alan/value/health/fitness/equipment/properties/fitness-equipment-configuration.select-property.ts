import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const fitnessEquipmentConfiguration = {
  id: "01a06865-7f45-7b38-8b71-89af2d19a5a6",
  type: "page-type/select-property",
  slug: "fitness-equipment-configuration",
  propertySlug: "configuration",
  definition: "how many of a piece there are and whether its load moves",
  values: ["pair", "single", "adjustable", "n-a"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece with no load at all is configured n-a.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:51:17.317Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies SelectProperty
