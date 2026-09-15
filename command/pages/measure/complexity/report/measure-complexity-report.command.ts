import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureComplexityReport = {
  id: "01a08ccd-dddb-7be6-a0d9-3752b6db6da1",
  type: "page-type/command",
  slug: "measure-complexity-report",
  definition: "the command saying every complexity metric by percentile, with the outliers of each",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each metric is answered at p50, p75, p90, p95, p99 and its maximum.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The report is taken over the whole workspace and counts every row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call saying no count shows ten outliers of each metric.",
    },
  ],
  name: "report",
  arguments: [{ argument: "argument/json" }, { argument: "argument/top" }],
} as const satisfies Command
