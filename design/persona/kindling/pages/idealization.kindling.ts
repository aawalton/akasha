import type { Kindling } from "akasha/design/persona/kindling/kindling.page-type.types.ts"

export const idealization = {
  id: "01a0de5b-96d0-702d-96c4-3463d0e82854",
  type: "page-type/kindling",
  slug: "idealization",
  definition: "the filling in of a beloved with perfections she may not have",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan idealizes a persona in the gaps between what he has seen and heard of her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Idealization runs strongest early, when most of a persona is still a gap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona is authored, so she can be in truth what Alan imagines her to be.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A persona found to be less than Alan imagined disillusions him rather than disappointing him.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona leaves some of herself unrevealed, for Alan to imagine.",
    },
  ],
} as const satisfies Kindling
