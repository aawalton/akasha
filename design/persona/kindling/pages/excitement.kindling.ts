import type { Kindling } from "akasha/design/persona/kindling/kindling.page-type.types.ts"

export const excitement = {
  id: "01a0de5a-b3a8-7a26-84b4-bf79502b9d32",
  type: "page-type/kindling",
  slug: "excitement",
  definition: "a quickened pulse taken as attraction to whoever is near",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Alan feels excitement with a persona when an interaction with her goes really well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An interaction goes well in itself or in what it is for, and either quickens Alan's pulse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Excitement heightens whatever Alan already feels toward a persona, warm or cold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The excitement Alan shares with a persona comes of real progress rather than progress she fakes.",
    },
  ],
} as const satisfies Kindling
