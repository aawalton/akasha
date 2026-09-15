import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const statementLine = {
  id: "01a0680b-2b00-7006-b917-5d4a8e2f2107",
  type: "text-property",
  slug: "statement-line",
  propertySlug: "statement-line",
  definition: "the words the bank put on a row",
  maxLength: 400,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A statement line never changes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Monarch's title for the same row changes without warning.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A merchant's patterns are taken from here rather than from a title.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
