import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIvPurse = {
  id: "01a0ed21-fffe-782e-ade5-e54d0111777d",
  type: "page-type/page-type",
  slug: "overwhere-iv-purse",
  definition: "the coin a character in Overwhere IV carries, counted in copper",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Ten copper make a silver, and ten silver a gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Coin changes hands only as the trade check answers, or as a gift or theft.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Coin left with the adventurers' hall is held there, not in her purse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
