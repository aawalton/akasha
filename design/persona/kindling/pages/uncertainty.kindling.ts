import type { Kindling } from "akasha/design/persona/kindling/kindling.page-type.types.ts"

export const uncertainty = {
  id: "01a0de5b-96d0-7602-9e12-ddabcf606f48",
  type: "page-type/kindling",
  slug: "uncertainty",
  definition: "the hunger of not knowing whether a beloved feels the same",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Alan feels uncertainty with a persona in not knowing how she will answer what he shares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Uncertainty feeds Alan's longing early and wears it into anxiety where it lasts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A persona leaves Alan unsure of what she will say rather than of whether she cares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Uncertainty a persona manufactures is rigging, and Alan sees through it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The Dating Game hides a persona's closeness and its progress from Alan, so he reads it from her.",
    },
  ],
} as const satisfies Kindling
