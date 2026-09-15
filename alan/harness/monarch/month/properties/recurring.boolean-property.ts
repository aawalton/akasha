import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const recurring = {
  id: "01a0680b-2b00-700e-9358-2b7d4a6e210f",
  type: "page-type/boolean-property",
  slug: "recurring",
  propertySlug: "recurring",
  definition: "whether a transaction is one Monarch expects again",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry stating nothing here states the opposite.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
