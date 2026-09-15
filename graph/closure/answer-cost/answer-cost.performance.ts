import type { Performance } from "akasha/code/performance/performance.page-type.types.ts"

export const answerCost = {
  id: "01a0a5da-3d97-7e80-a9a5-3490d7e2a3e7",
  type: "page-type/performance",
  slug: "answer-cost",
  definition: "how long the graph takes to answer a closure over this checkout",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The closures are measured over this checkout rather than over a scratch world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the code a closure is seeded from sits is asked of the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A closure going out and a closure coming in are measured apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How many files a closure reached is reported beside what that closure took.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No figure here is judged against a limit.",
    },
  ],
} as const satisfies Performance
