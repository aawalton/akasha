import type { NumberProperty } from "@akasha/pages/number-property"
import type { List } from "@akasha/pages/page-property"

export type EquipmentLoads = List<number>

export const equipmentLoads = {
  id: "01a06865-7f45-7d1f-b0db-1e4af78cdf9c",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "equipment-loads",
  propertySlug: "loads",
  definition: "the weights a piece of kit is available at, in pounds",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The loads are in the order the loads are climbed from lightest to heaviest.",
    },
    {
      invariantKind: "departure",
      statement: "A piece whose load is not chosen in steps names no load.",
    },
    {
      invariantKind: "departure",
      statement: "A load is the weight one side carries rather than the weight the pair has.",
    },
  ],
} as const satisfies NumberProperty
