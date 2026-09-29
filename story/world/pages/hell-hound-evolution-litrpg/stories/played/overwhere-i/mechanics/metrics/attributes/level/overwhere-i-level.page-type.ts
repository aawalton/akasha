import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereILevel = {
  id: "01a0ed2b-b8a1-7e7f-9364-bbc7be4d49c9",
  type: "page-type/page-type",
  slug: "overwhere-i-level",
  definition: "the level the System gives a character in Overwhere I",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every being the System has woven has a level, starting at one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level rises only as the growth check answers, from marks earned by kills.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Analyze shows a being as Human - Level N, or ?? where it is far stronger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ordinary beasts and people of this region are level 15 and under.",
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
