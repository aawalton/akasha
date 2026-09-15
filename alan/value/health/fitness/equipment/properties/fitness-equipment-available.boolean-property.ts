import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const fitnessEquipmentAvailable = {
  id: "01a06865-7f45-728c-9ab5-6435379d69d3",
  type: "page-type/boolean-property",
  slug: "fitness-equipment-available",
  propertySlug: "available",
  definition: "whether Alan can load a movement with this piece today",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece Alan means to buy is a page already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece Alan means to buy is not available.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
