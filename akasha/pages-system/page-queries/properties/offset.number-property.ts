import type { NumberProperty } from "../../number-properties/number-property.page-type.ts"

export type Offset = number

export const offset = {
  id: "01a063ee-2a3b-7073-8d29-bb272e29d222",
  pageTypeSlug: "number-property",
  slug: "offset",
  propertySlug: "offset",
  definition: "how many pages a query passes over before it answers",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An offset is taken after the answer is ordered and before the limit.",
    },
  ],
} as const satisfies NumberProperty
