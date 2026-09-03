import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type Formula = string

export const formula = {
  id: "01a06553-4713-7002-b04b-bf71acc5d15d",
  pageTypeSlug: "text-property",
  slug: "formula",
  propertySlug: "formula",
  definition: "what a property is worked out from, written in the formula language",
  max: 500,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key a formula names is written in braces.",
    },
    {
      invariantKind: "departure",
      statement: "A key a formula names is a property of the page type the formula stands on.",
    },
    {
      invariantKind: "departure",
      statement: "A formula may name another formula.",
    },
    {
      invariantKind: "departure",
      statement: "No formula names itself however far the chain of names runs.",
    },
  ],
} as const satisfies TextProperty
