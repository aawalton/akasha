import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const scopes = {
  id: "01a054d8-1d39-7232-855e-3f83e6fed615",
  type: "page-type/text-property",
  slug: "scopes",
  propertySlug: "scopes",
  definition: "a thing a model account can do with its credentials",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A scope is written as the grant spells the scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scopes sit in the order the grant returned.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
