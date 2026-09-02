import type { NumberProperty } from "../../number-properties/number-property.page-type.ts"

export type Limit = number

export const limit = {
  id: "01a063ee-2a3b-79d6-872a-49aaca6ffdf1",
  pageTypeSlug: "number-property",
  slug: "limit",
  propertySlug: "limit",
  definition: "the most pages a query answers with",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query stating no limit answers with every page that passed.",
    },
    {
      invariantKind: "departure",
      statement: "A limit is taken after the answer is ordered.",
    },
  ],
} as const satisfies NumberProperty
