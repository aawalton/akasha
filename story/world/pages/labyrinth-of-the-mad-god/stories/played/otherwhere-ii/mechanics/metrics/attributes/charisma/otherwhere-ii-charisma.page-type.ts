import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIiCharisma = {
  id: "01a0e998-6521-7fdb-9a5f-dfa9e55ce111",
  type: "page-type/page-type",
  slug: "otherwhere-ii-charisma",
  definition: "how strongly a character in Otherwhere draws and sways others",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Charisma is the attribute for winning trust, leading, and calming or cowing a beast.",
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
