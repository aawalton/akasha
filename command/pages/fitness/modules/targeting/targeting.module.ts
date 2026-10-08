import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const targeting = {
  id: "01a0c433-c8ac-7807-9834-28647909b51b",
  type: "page-type/module",
  slug: "targeting",
  definition: "the pounds a day is to move, and how much of that Alan has moved",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's target is worked out again each run from the sets already logged.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page carries a target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The target opens at the seed on the first day a target bound Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day that moved its target or more raises the next day's target by the rise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A week that reached its target on no day lowers the target by the fall.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A week is Monday through Sunday, and is judged once Sunday is past.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A week Alan never trained is a week that reached its target on no day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target never falls below the rise, so there is always a day's work in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every set counts toward a day, whether that set warmed Alan or worked him.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set naming a movement this does not know moves the weight it states alone.",
    },
  ],
} as const satisfies Module
