import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureComplexityReport = {
  id: "01a08ccd-dddb-7be6-a0d9-3752b6db6da1",
  type: "command",
  slug: "measure-complexity-report",
  definition: "every complexity metric by percentile, with the outliers of each",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--top <n>", takes: "how many outliers each metric shows, worst first" },
    { said: "--json", takes: "the rows as one line of JSON rather than as tab-separated columns" },
  ],
  helpNotes: [
    "this says p50, p75, p90, p95, p99 and the maximum, because complexity follows a power law and a mean hides the outliers the maintenance is spent on.",
    "this is taken over the whole workspace and counts every row, so it takes no file and no threshold.",
    "ten outliers of each metric are shown where no count is said.",
  ],
} as const satisfies Command
