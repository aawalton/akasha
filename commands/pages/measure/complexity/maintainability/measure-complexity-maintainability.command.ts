import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureComplexityMaintainability = {
  id: "01a08ccd-ace4-705b-8318-42e706de96ae",
  type: "command",
  slug: "measure-complexity-maintainability",
  definition:
    "the command saying the maintainability index of each file of a checkout's TypeScript",
  code: "ts",
  taking: [
    { said: "--file-path <path>", takes: "the one file to read, said from the repository root" },
    { said: "--threshold <n>", takes: "the index a row must be at or under to be in the answer" },
    { said: "--top <n>", takes: "how many rows are in the answer, worst first" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The index is the Visual Studio variant over volume, the cyclomatic sum and the source lines.",
    },
    {
      invariantKind: "departure",
      statement: "A blank line and a comment-only line are no source line.",
    },
    {
      invariantKind: "departure",
      statement: "A row is one file, and the rows are ordered by index, lowest first.",
    },
  ],
  name: "maintainability",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
