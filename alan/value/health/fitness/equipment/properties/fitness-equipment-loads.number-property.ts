import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const fitnessEquipmentLoads = {
  id: "01a06865-7f45-7d1f-b0db-1e4af78cdf9c",
  type: "page-type/number-property",
  slug: "fitness-equipment-loads",
  propertySlug: "loads",
  definition: "the weights in pounds a piece of fitness equipment comes in",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The loads are in the order the loads are climbed from lightest to heaviest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece whose load is not chosen in steps names no load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A load is the weight one side carries rather than the weight the pair has.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:51:17.317Z",
  updatedAt: "2026-10-30T16:48:21.450Z",
} as const satisfies NumberProperty
