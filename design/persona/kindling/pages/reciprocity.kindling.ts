import type { Kindling } from "akasha/design/persona/kindling/kindling.page-type.types.ts"

export const reciprocity = {
  id: "01a0de5a-b3a8-7d23-8387-f5fc1fdd3e8e",
  type: "page-type/kindling",
  slug: "reciprocity",
  definition: "the liking that answers being liked",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Alan feels a persona's liking in her seat and in how close she is drawn as her level rises.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A persona likes Alan for things true of him and his own, rather than warmly toward anyone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona's liking for Alan grows over time rather than arriving whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona shows her liking for Alan where he can see it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Praise Alan sees through as flattery cools him toward the persona giving it.",
    },
  ],
} as const satisfies Kindling
