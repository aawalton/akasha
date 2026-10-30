import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const fitnessEquipmentConfiguration = {
  id: "01a06865-7f45-7b38-8b71-89af2d19a5a6",
  type: "page-type/select-property",
  slug: "fitness-equipment-configuration",
  propertySlug: "configuration",
  definition:
    "whether a piece of fitness equipment comes in a pair or with a weight Alan can change",
  values: ["pair", "single", "adjustable", "n-a"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece with no load at all is configured n-a.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:51:17.317Z",
  updatedAt: "2026-10-30T16:47:44.896Z",
} as const satisfies SelectProperty
