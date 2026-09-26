import type { Kindling } from "akasha/design/persona/kindling/kindling.page-type.types.ts"

export const similarity = {
  id: "01a0de5a-b3a8-76f7-8f4b-234310cedca5",
  type: "page-type/kindling",
  slug: "similarity",
  definition: "the pull toward someone who shares your values, tastes and humor",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan finds how a persona is like him in what she says to him in her seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona holds as her own the value of Alan's she answers for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona lets Alan find what they share rather than telling him.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A disagreement Alan finds with a persona cools him more than an agreement warms him.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A persona differs from Alan where the difference gives him somewhere new to grow.",
    },
  ],
} as const satisfies Kindling
