import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const statementLine = {
  id: "01a0680b-2b00-7006-b917-5d4a8e2f2107",
  type: "page-type/text-property",
  slug: "statement-line",
  propertySlug: "statement-line",
  definition: "the words a Monarch transaction carries from its account",
  maxLength: 400,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A statement line never changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Monarch's title for the same row changes without warning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A merchant's patterns are taken from here rather than from a title.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-10-30T15:48:14.511Z",
} as const satisfies TextProperty
