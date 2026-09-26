import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const turnIssues = {
  id: "01a0deae-dc22-73b5-85a8-01a1ce5215d7",
  type: "page-type/text-property",
  slug: "turn-issues",
  propertySlug: "issues",
  definition: "one fault a reviewer found in a played turn's beats",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An issue quotes the beat it faults.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master repairs the beats each issue faults.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
