import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoDay = {
  id: "01a05c77-31e6-7a9f-9805-d1c81725dd03",
  type: "page-type/module",
  slug: "eso-day",
  definition: "the day counted from six in the morning in New York, and the span one covers",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is anchored at noon rather than at the reset that opens the day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window's bounds are each worked out against the offset those bounds themselves land in.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "Two days are differenced as calendar days rather than as elapsed hours.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day steps back on the wall clock rather than by a whole day of elapsed time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reset an instant is counted from is the start of that instant's day window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day that will not parse is refused rather than answered with an epoch window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is refused unless it is a real date written YYYY-MM-DD.",
    },
  ],
} as const satisfies Module
