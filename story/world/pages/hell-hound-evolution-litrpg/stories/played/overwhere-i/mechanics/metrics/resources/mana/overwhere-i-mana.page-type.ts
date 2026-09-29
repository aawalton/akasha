import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIMana = {
  id: "01a0ed2b-b8a2-7a22-97c0-82fbeb0ca3fa",
  type: "page-type/page-type",
  slug: "overwhere-i-mana",
  definition: "the mana a character in Overwhere I has left",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill spends the mana its own page names each time it is used.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Most mana is four for each point of Attunement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mana comes back at a tenth of most mana every ten minutes, resting or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill with too little mana left for it cannot be used.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in mana is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No mana shows as a number save where her status shows it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
