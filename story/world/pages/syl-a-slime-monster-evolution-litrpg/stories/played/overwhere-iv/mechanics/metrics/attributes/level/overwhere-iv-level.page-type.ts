import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIvLevel = {
  id: "01a0ed21-fffc-775f-9c79-0432894b734e",
  type: "page-type/page-type",
  slug: "overwhere-iv-level",
  definition: "the level a character in Overwhere IV has reached on one track",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug ends in its track: race or class.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level rises only as the growth check answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her status shows the race level as Human LV 2, and a class as Mage LV 3.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A townsman is race LV 5 to 15; a guard or hunter 15 to 30; a gold adventurer 30 up.",
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
