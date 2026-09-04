import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EquipmentLoads = number

export const equipmentLoads = {
  id: "01a06865-7f45-7d1f-b0db-1e4af78cdf9c",
  pageTypeSlug: "number-property",
  slug: "equipment-loads",
  propertySlug: "loads",
  definition: "the weights a piece of kit is available at, in pounds",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The loads stand in the order they are climbed, lightest first.",
    },
    {
      invariantKind: "departure",
      statement: "A piece whose load is not chosen in steps names none.",
    },
    {
      invariantKind: "departure",
      statement: "A load is what one side carries rather than what the pair carries.",
    },
  ],
} as const satisfies NumberProperty
