import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIvPoints = {
  id: "01a0ed21-fffe-7089-9adc-316daedd5e46",
  type: "page-type/page-type",
  slug: "overwhere-iv-points",
  definition: "the unspent points of one kind a character in Overwhere IV holds",
  extends: ["page-type/metric-character-point"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug ends in its kind: trait, skill, profession or legend.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points are earned as the growth check answers, and spent as she chooses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her status shows each kind she holds as a line: Trait Points remaining: 2.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-29T12:27:03.550Z",
  updatedAt: "2026-10-27T18:53:28.972Z",
} as const satisfies PageType
