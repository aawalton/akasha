import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const pending = {
  id: "01a0680b-2b00-7010-8a46-3e9c7b2d2111",
  type: "page-type/boolean-property",
  slug: "pending",
  propertySlug: "pending",
  definition: "whether a transaction has yet to clear",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry stating nothing here states the opposite.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
