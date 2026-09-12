import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureComplexityMaintainability = {
  id: "01a08ccd-ace4-705b-8318-42e706de96ae",
  type: "command",
  slug: "measure-complexity-maintainability",
  definition:
    "the command saying the maintainability index of each file of a checkout's TypeScript",
  code: "ts",
  test: "ts",
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
    {
      invariantKind: "departure",
      statement: "A cutoff keeps the rows whose index is at or under it.",
    },
  ],
  name: "maintainability",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/file-path" },
    { argument: "argument/top" },
    { argument: "argument/threshold" },
  ],
} as const satisfies Command
