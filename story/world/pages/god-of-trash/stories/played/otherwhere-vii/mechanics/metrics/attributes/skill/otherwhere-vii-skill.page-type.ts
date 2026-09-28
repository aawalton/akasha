import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViiSkill = {
  id: "01a0ea36-990a-701b-a132-7f471ea84fbe",
  type: "page-type/page-type",
  slug: "otherwhere-vii-skill",
  definition: "one character's level in one skill the System counts in Otherwhere VII",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page's title names the skill as the System names it, and its description says what it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill is filed at one the first time she works at it in earnest and it matters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resist skill is filed at one the first time she endures what it resists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's bonus is one from level 1, two from 5, three from 15 and four from 30.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill rises one when used in earnest where the outcome mattered and came off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "From level 10 a skill rises at most once a day, from 20 once in three days, and from 40 once a week.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill bound to her path rises twice as often.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A new understanding of a skill, taught or found, can raise it several levels at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Before she awakens her skills are counted all the same, and none is shown to her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: 'Once awakened, a new skill shows as "Name 1" and a rise as "Name 4 > 5".',
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
