import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const wordBacklog = {
  id: "01a10211-7e1e-7032-bb27-18192e38142a",
  type: "page-type/number-property",
  slug: "word-backlog",
  propertySlug: "word-backlog",
  definition: "how many unread words a written story keeps written ahead",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story stating no word backlog has a word backlog of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A published chapter not completed counts the words it has left toward the backlog.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words a chapter has left are its own remaining, never below zero.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
