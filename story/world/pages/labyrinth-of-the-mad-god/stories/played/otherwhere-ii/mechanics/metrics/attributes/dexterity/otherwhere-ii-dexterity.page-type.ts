import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIiDexterity = {
  id: "01a0e998-6522-7367-9547-c672fe1e79fe",
  type: "page-type/page-type",
  slug: "otherwhere-ii-dexterity",
  definition: "how quick and deft a character in Otherwhere is",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Dexterity is the attribute for speed, balance, dodging, aim and fine work with the hands.",
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
