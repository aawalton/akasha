import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereStrength = {
  id: "01a0e998-6522-7669-804a-7c1a86752887",
  type: "page-type/page-type",
  slug: "otherwhere-strength",
  definition: "how strong a character in Otherwhere is",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Strength is the attribute for lifting, pulling, climbing and the force behind a blow.",
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
