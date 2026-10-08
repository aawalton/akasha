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
  createdAt: "2026-08-30T22:44:04.537Z",
  updatedAt: "2026-09-25T18:02:40.000Z",
} as const satisfies TextProperty
