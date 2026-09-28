import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIiToughness = {
  id: "01a0e998-6522-7cc3-a14d-fdaa34ad53ae",
  type: "page-type/page-type",
  slug: "otherwhere-ii-toughness",
  definition: "how tough a character in Otherwhere is",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Toughness is the attribute for enduring blows, heat, cold, poison and long effort.",
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
