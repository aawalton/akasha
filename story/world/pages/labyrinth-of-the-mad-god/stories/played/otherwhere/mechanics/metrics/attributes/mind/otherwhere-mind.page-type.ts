import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereMind = {
  id: "01a0e998-6522-739d-b5b4-7bb7ee2bf58f",
  type: "page-type/page-type",
  slug: "otherwhere-mind",
  definition: "how keen a character's mind in Otherwhere is",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Mind is the attribute for reasoning, memory, noticing and foreseeing how things move.",
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
