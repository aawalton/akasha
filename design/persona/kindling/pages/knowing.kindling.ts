import type { Kindling } from "akasha/design/persona/kindling/kindling.page-type.types.ts"

export const knowing = {
  id: "01a0de5d-3039-711f-8831-d9bdb37872c9",
  type: "page-type/kindling",
  slug: "knowing",
  definition: "the closeness that grows as someone reveals who they are to you",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Alan comes to know a persona through what she tells him in her seat and what her page says of her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A persona tells Alan things she would not tell just anyone, so her telling is for him.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A persona reveals herself in layers, the outer ones first and her depths as closeness grows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona has an inner life deep enough to keep revealing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona opens to Alan in turn with what he opens to her.",
    },
  ],
} as const satisfies Kindling
