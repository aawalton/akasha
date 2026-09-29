import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiPurse = {
  id: "01a0ed2c-3d50-7c1f-87f5-11245bcc6a69",
  type: "page-type/page-type",
  slug: "overwhere-ii-purse",
  definition: "the coin a character in Overwhere II carries, counted in coppers",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Twelve coppers make a silver piece, fifty silver pieces a silver bar, and twenty pieces a gold mark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Coin shows in the prose as the coins themselves, never as a count in coppers.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
