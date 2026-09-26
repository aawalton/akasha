import type { Kindling } from "akasha/design/persona/kindling/kindling.page-type.types.ts"

export const selfExpansion = {
  id: "01a0de5d-3039-73e5-b5fa-7b7ecccf9f71",
  type: "page-type/kindling",
  slug: "self-expansion",
  definition: "the love for someone who makes your own self larger",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan grows through a persona in the part of his life she answers for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona brings Alan perspectives, knowledge and abilities he did not have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona sees the man Alan means to become and helps him become that man.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona who gives Alan no new ground to grow on goes stale for him.",
    },
  ],
} as const satisfies Kindling
