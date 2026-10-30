import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const recordBrief = {
  id: "01a0657d-b91d-7300-bbfd-a4142a6e47e4",
  type: "page-type/text-property",
  slug: "record-brief",
  propertySlug: "brief",
  definition: "the summary a book record has outside its text",
  maxLength: 500,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A brief is written outside the text the brief summarises.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A brief says the substance of a record rather than repeating the record's text.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:18:53.341Z",
  updatedAt: "2026-10-30T14:53:53.709Z",
} as const satisfies TextProperty
