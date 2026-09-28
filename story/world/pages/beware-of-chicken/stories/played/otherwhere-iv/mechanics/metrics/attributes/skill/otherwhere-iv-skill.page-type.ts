import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIvSkill = {
  id: "01a0e9f2-33a2-7aea-8e04-8f2eb5b5bf1e",
  type: "page-type/page-type",
  slug: "otherwhere-iv-skill",
  definition: "one character's level in one learned craft in Otherwhere IV",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's title names the craft, and its description says what the craft is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A craft is filed at nought the first time she works at it in earnest or is taught it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft's level, nought to four, is the bonus it gives an act it fits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft rises one when used in earnest where the outcome mattered and came off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Below two a craft rises at most once a day, and from two at most once in three days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A teacher's instruction that day lets a craft rise once more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mortal craft stops at four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in a craft is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No level shows as a number; skill shows in how the work goes.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
