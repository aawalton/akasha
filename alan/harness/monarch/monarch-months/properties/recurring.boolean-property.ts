import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Recurring = boolean

export const recurring = {
  id: "01a0680b-2b00-700e-9358-2b7d4a6e210f",
  pageTypeSlug: "boolean-property",
  slug: "recurring",
  propertySlug: "recurring",
  definition: "whether a transaction is one Monarch expects again",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry stating nothing here states the opposite.",
    },
  ],
} as const satisfies BooleanProperty
