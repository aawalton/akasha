import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Pending = boolean

export const pending = {
  id: "01a0680b-2b00-7010-8a46-3e9c7b2d2111",
  pageTypeSlug: "boolean-property",
  slug: "pending",
  propertySlug: "pending",
  definition: "whether a transaction has yet to clear",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry stating nothing here states the opposite.",
    },
  ],
} as const satisfies BooleanProperty
