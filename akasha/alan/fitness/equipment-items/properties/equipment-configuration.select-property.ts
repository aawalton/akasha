import type { SelectProperty } from "@akasha/pages-system/select-property"

export const equipmentConfiguration = {
  id: "01a06865-7f45-7b38-8b71-89af2d19a5a6",
  pageTypeSlug: "select-property",
  slug: "equipment-configuration",
  propertySlug: "configuration",
  definition: "how many of a piece there are and whether its load moves",
  values: ["pair", "single", "adjustable", "n-a"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A piece carrying no load at all is configured n-a.",
    },
  ],
} as const satisfies SelectProperty

export type EquipmentConfiguration = (typeof equipmentConfiguration.values)[number]
