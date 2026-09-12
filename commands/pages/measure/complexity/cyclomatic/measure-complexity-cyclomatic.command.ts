import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureComplexityCyclomatic = {
  id: "01a08ccd-4d69-70c6-a642-6a6ac9529d4a",
  type: "command",
  slug: "measure-complexity-cyclomatic",
  definition:
    "the command saying the McCabe complexity of each function of a checkout's TypeScript",
  code: "ts",
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
    { invariantKind: "departure", statement: "A cutoff keeps the rows at or over it." },
  ],
  name: "cyclomatic",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/file-path" },
    { argument: "argument/top" },
    { argument: "argument/threshold" },
  ],
} as const satisfies Command
