import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereCreativity = {
  id: "01a0e998-6522-7394-adda-34f90b7eee7f",
  type: "page-type/page-type",
  slug: "otherwhere-creativity",
  definition: "how inventive a character in Otherwhere is",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Creativity is the attribute for picturing, invention and shaping a spell in the mind.",
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
