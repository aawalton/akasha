import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const fitnessEquipmentAvailable = {
  id: "01a06865-7f45-728c-9ab5-6435379d69d3",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "fitness-equipment-available",
  propertySlug: "available",
  definition: "whether Alan can load a movement with this piece today",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A piece Alan means to buy is a page already.",
    },
    {
      invariantKind: "departure",
      statement: "A piece Alan means to buy is not available.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
