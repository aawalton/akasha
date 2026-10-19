import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const caseAgainst = {
  id: "01a090dc-6a68-7d53-96a4-6a504d4d4e74",
  type: "page-type/text-property",
  slug: "case-against",
  propertySlug: "against",
  definition: "the text that judges a case",
  maxLength: 2000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A case judging its text against the page the case names states nothing here.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-11T14:25:59.400Z",
  updatedAt: "2026-10-19T19:07:30.096Z",
} as const satisfies TextProperty
