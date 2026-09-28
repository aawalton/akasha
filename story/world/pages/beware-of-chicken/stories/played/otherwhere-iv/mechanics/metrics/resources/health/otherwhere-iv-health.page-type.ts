import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereIvHealth = {
  id: "01a0e9f7-c596-73d9-aee6-f6c71a2ccf28",
  type: "page-type/page-type",
  slug: "otherwhere-iv-health",
  definition: "the health a character in Otherwhere IV has left",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A mortal woman has twenty health, and a grown mortal man twenty-four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe is filed as a character with a health page of its own before it is hurt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below half her health she hurts, and every act costs her one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought she is down and senseless, at the mercy of whatever remains.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm dealt past nought, a fifth of her health or more, kills her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Half her health or more lost to one blow leaves a lasting injury as a condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep with food and shelter gives back a quarter of her health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night in the open, cold or hungry, gives back nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clean dressing, herbs or a healer's care double what a night gives back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lasting injury heals only with time and care, as its condition says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in health is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No health shows as a number; hurt shows as the body shows it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
