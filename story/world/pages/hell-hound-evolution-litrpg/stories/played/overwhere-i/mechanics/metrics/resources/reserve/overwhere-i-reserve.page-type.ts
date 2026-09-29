import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIReserve = {
  id: "01a0ed2b-b8a2-7386-a822-fd111999eefc",
  type: "page-type/page-type",
  slug: "overwhere-i-reserve",
  definition: "how much of one element a character's legacy holds in Overwhere I",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug ends in the element it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The five elements are Earth, Fire, Wind, Water and Electricity.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reserve's most is what the legacy holding names, and rises ten each rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each working of the legacy spends the element cost the legacy page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reserve fills again from empty over the refill minutes the legacy page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty reserve cannot be drawn on until it fills again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No reserve shows as a number save where her status shows it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
