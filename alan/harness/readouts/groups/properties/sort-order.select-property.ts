import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const sortOrder = {
  id: "01a063bd-a526-7474-a7c9-3980d10c48b3",
  type: "select-property",
  slug: "sort-order",
  propertySlug: "sort-order",
  definition: "whether a group draws its readings in label order or in place order",
  values: ["label", "place"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A group stating nothing draws in label order.",
    },
    {
      invariantKind: "departure",
      statement: "Two readings sharing one place draw in label order between the two.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
