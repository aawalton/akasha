import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiAttribute = {
  id: "01a0ed2a-8082-76e1-9677-e0c35547fe52",
  type: "page-type/page-type",
  slug: "overwhere-ii-attribute",
  definition: "one of the four attributes kept for a character in Overwhere II",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug ends in the attribute it keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The four attributes are Might, Speed, Wits and Presence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ordinary adult has six in each; a trained soldier eight to ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Water cycling in a Talented body raises Might and Speed with each Depth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute rises only as the growth check answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No attribute ever shows as a number in the prose.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
