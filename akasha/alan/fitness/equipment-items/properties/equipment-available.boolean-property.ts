import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type EquipmentAvailable = boolean

export const equipmentAvailable = {
  id: "01a06865-7f45-728c-9ab5-6435379d69d3",
  pageTypeSlug: "boolean-property",
  slug: "equipment-available",
  propertySlug: "available",
  definition: "whether Alan can load a movement with this piece today",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A piece Alan means to buy is a page already, and is not available.",
    },
  ],
} as const satisfies BooleanProperty
