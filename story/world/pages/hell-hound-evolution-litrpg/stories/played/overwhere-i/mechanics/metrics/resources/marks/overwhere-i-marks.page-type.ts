import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIMarks = {
  id: "01a0ed2b-b8a2-705c-b36f-1e14569936d4",
  type: "page-type/page-type",
  slug: "overwhere-i-marks",
  definition: "the experience a character in Overwhere I holds toward the next level",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Marks are earned by kills and spent on levels, as the growth check answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Marks left after a level rises are carried toward the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The System never shows marks as a number; it shows only Experience Gained!",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
