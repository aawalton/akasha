import type { TextProperty } from "@akasha/pages-system/text-property"

export type StatementLine = string

export const statementLine = {
  id: "01a0680b-2b00-7006-b917-5d4a8e2f2107",
  pageTypeSlug: "text-property",
  slug: "statement-line",
  propertySlug: "statement-line",
  definition: "the words the bank put on a row",
  max: 400,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A statement line never changes, where Monarch's title for the same row changes without warning.",
    },
    {
      invariantKind: "departure",
      statement: "A merchant's patterns are taken from here rather than from a title.",
    },
  ],
} as const satisfies TextProperty
