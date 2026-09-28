import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIiLevel = {
  id: "01a0e998-6522-74af-bb21-88b78698aa47",
  type: "page-type/page-type",
  slug: "otherwhere-ii-level",
  definition: "the level a character in Otherwhere has reached",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A survivor of Earth begins at level 0 of tier one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level is gained by experience from beasts killed, quests done and trials met.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A level gives the points its class states, and is felt in the core before it is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in level is written on the page and a line of its history before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
