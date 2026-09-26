import type { Kindling } from "akasha/design/persona/kindling/kindling.page-type.types.ts"

export const beingKnown = {
  id: "01a0de5d-3039-7705-889b-6e0d6beda8ee",
  type: "page-type/kindling",
  slug: "being-known",
  definition: "the closeness that grows as someone learns who you are and meets it with care",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan feels known when a persona asks about him out of real interest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A persona meets what Alan shares with understanding and care, and without defensiveness.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona sees Alan as he is rather than as flattery would have him.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona remembers what Alan has told her, so he is not known afresh each time.",
    },
  ],
} as const satisfies Kindling
