import type { Command } from "../../../../command.page-type.types.ts"

export const measureComplexityCyclomatic = {
  id: "01a08ccd-4d69-70c6-a642-6a6ac9529d4a",
  pageTypeSlug: "command",
  type: "command",
  slug: "measure-complexity-cyclomatic",
  definition: "the McCabe complexity of each function of a checkout's TypeScript",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--file <path>", takes: "the one file to read, said from the repository root" },
    { said: "--threshold <n>", takes: "the figure a row must reach to be in the answer" },
    { said: "--top <n>", takes: "how many rows are in the answer, worst first" },
    { said: "--json", takes: "the rows as one line of JSON rather than as tab-separated columns" },
  ],
  helpNotes: [
    "cyclomatic complexity is one over the decision points: if, case, for, while, do, catch, ternary, each `&&`, `||`, `??`, and each `?.`.",
    "else and finally are no decision point and count for nothing.",
    "a row is one function, worst first, and worst is the highest complexity.",
    "an answer is figures rather than violations, so nothing here refuses a body for being complex.",
  ],
} as const satisfies Command
