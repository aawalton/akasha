import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const sortOrder = {
  id: "01a063bd-a526-7474-a7c9-3980d10c48b3",
  type: "page-type/select-property",
  slug: "sort-order",
  propertySlug: "sort-order",
  definition: "whether a group draws its readings in label order or in place order",
  values: ["label", "place"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A group stating nothing draws in label order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two readings sharing one place draw in label order between the two.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
