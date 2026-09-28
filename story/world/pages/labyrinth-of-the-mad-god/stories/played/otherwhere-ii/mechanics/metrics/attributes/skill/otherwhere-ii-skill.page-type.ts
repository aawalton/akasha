import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIiSkill = {
  id: "01a0e99f-d371-7e12-866b-1b0ea0f21f8e",
  type: "page-type/page-type",
  slug: "otherwhere-ii-skill",
  definition: "one character's level in one skill in Otherwhere",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's title names the skill, and its description says what the skill is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is unlocked at nought the first time she follows its sense of rightness.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill rises a point when used in earnest where the outcome mattered and came off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Below five a skill rises at most once a day, and from five at most once in two days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Danger, a strong outcome or a teacher lets a skill rise once more that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A basic class caps its skills at ten, an uncommon one at twenty-five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill gives a felt rightness and correction, never new moves it has not been shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's level is the skill named in an action check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill rising shows as a System window when the turn's danger has passed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in a skill is written on its page and a line of its history before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
