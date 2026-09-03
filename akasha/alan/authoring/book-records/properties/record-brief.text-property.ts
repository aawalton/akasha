import type { TextProperty } from "@akasha/pages-system/text-property"

export type RecordBrief = string

export const recordBrief = {
  id: "01a0657d-b91d-7300-bbfd-a4142a6e47e4",
  pageTypeSlug: "text-property",
  slug: "record-brief",
  propertySlug: "brief",
  definition: "the summary a record carries apart from its text",
  max: 500,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A brief is written outside the text the brief summarises.",
    },
    {
      invariantKind: "departure",
      statement: "A brief says what a record holds rather than repeating what the record says.",
    },
  ],
} as const satisfies TextProperty
