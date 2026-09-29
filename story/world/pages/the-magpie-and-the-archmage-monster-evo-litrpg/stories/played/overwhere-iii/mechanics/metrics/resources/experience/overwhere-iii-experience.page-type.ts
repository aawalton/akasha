import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiExperience = {
  id: "01a0ed27-2719-759f-8e51-866ec9812602",
  type: "page-type/page-type",
  slug: "overwhere-iii-experience",
  definition: "the experience a character in Overwhere III has earned toward the next level",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The growth check alone adds experience and turns it into levels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The most this holds is a hundred times the holder's level; reaching it is a level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Experience never shows as a number; the System says only that it was gained.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
