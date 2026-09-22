import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const caseAgainst = {
  id: "01a090dc-6a68-7d53-96a4-6a504d4d4e74",
  type: "page-type/text-property",
  slug: "case-against",
  propertySlug: "against",
  definition: "what judges a case's text",
  maxLength: 2000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A case judging its text against the page the case names states nothing here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
