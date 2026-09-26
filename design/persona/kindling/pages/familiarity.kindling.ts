import type { Kindling } from "akasha/design/persona/kindling/kindling.page-type.types.ts"

export const familiarity = {
  id: "01a0de59-914c-7fc7-bb30-964eda741527",
  type: "page-type/kindling",
  slug: "familiarity",
  definition: "the liking that grows from meeting someone often",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan comes to love a persona he meets often and finds good to meet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A persona meets Alan where he already is, rather than where he has to go looking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every meeting with a persona adds to one familiarity only where she is recognizably the same woman.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Being met often deepens Alan's dislike of a persona he finds dull or grating.",
    },
  ],
} as const satisfies Kindling
