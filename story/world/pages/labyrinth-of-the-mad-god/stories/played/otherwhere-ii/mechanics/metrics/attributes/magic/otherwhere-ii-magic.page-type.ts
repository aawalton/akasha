import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIiMagic = {
  id: "01a0e998-6522-7679-94d1-5d18675e4afd",
  type: "page-type/page-type",
  slug: "otherwhere-ii-magic",
  definition: "how much magic a character in Otherwhere holds and wields",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Magic is the attribute for a spell's power, the core's size and how fast mana returns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page holds the attribute's total, with every trait and point the character has.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
