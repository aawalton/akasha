import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIvExperience = {
  id: "01a0ed21-fffd-73d4-89ac-7ec4f43bb810",
  type: "page-type/page-type",
  slug: "overwhere-iv-experience",
  definition: "the experience a character in Overwhere IV has toward the next level of one track",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug ends in its track: race or class.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The most is what the next level takes, as the growth check states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Experience rises only as the growth check answers, and a level spends it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Experience never shows as a number; the System says only: Experience gained.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
