import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type RecordBrief = string

export const recordBrief = {
  id: "01a0657d-b91d-7300-bbfd-a4142a6e47e4",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "record-brief",
  propertySlug: "brief",
  definition: "the summary a record carries apart from its text",
  maxLength: 500,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A brief is written outside the text the brief summarises.",
    },
    {
      invariantKind: "departure",
      statement: "A brief says the substance of a record rather than repeating the record's text.",
    },
  ],
} as const satisfies TextProperty
