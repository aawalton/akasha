import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureComplexityCyclomatic = {
  id: "01a08ccd-4d69-70c6-a642-6a6ac9529d4a",
  type: "command",
  slug: "measure-complexity-cyclomatic",
  definition:
    "the command saying the McCabe complexity of each function of a checkout's TypeScript",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--file <path>", takes: "the one file to read, said from the repository root" },
    { said: "--threshold <n>", takes: "the figure a row must reach to be in the answer" },
    { said: "--top <n>", takes: "how many rows are in the answer, worst first" },
    { said: "--json", takes: "the rows as one line of JSON rather than as tab-separated columns" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A function's cyclomatic complexity is one more than its decision points.",
    },
    {
      invariantKind: "departure",
      statement:
        "A decision point is an if, a case, a loop, a catch, a ternary, `&&`, `||`, `??` or `?.`.",
    },
    {
      invariantKind: "departure",
      statement: "Neither an else nor a finally is a decision point.",
    },
    {
      invariantKind: "departure",
      statement: "A row is one function, and the rows are ordered by complexity, highest first.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a body for being complex.",
    },
  ],
} as const satisfies Command
