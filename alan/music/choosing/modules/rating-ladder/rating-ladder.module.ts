import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ratingLadder = {
  id: "01a06281-4d9d-7001-9db5-f9ea87db3f71",
  type: "page-type/module",
  slug: "rating-ladder",
  definition: "where a grade sits on the ladder, and which grades Alan likes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ladder is the values the `grade` property states, in the order stated.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung is written out here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade further along the ladder is the better grade.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade Alan has not given is below every rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade of `B-` or better is liked.",
    },
  ],
} as const satisfies Module
