import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const caseAgainst = {
  id: "01a090dc-6a68-7d53-96a4-6a504d4d4e74",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "case-against",
  propertySlug: "against",
  definition: "what a case's text is judged by",
  maxLength: 2000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A case judging its text against the page the case names states nothing here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
