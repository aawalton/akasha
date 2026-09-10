import type { TextProperty } from "../../text-properties/text-property.page-type.types.ts"

export type TargetKey = string

export const targetKey = {
  id: "01a063ee-2a3b-7b6b-9acc-cd9b9bbcf2d3",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "target-key",
  propertySlug: "target-key",
  definition: "the key a query reduces to one number",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key naming no number reduces to nothing.",
    },
  ],
} as const satisfies TextProperty
