import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type TargetKey = string

export const targetKey = {
  id: "01a063ee-2a3b-7b6b-9acc-cd9b9bbcf2d3",
  pageTypeSlug: "text-property",
  slug: "target-key",
  propertySlug: "target-key",
  definition: "the key a query reduces to one number",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key naming no number reduces to nothing.",
    },
  ],
} as const satisfies TextProperty
