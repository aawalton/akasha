import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureComplexityHalstead = {
  id: "01a08ccd-7cd6-78a7-b5f2-66cdcd08bc68",
  type: "command",
  slug: "measure-complexity-halstead",
  definition:
    "the command saying each function's token counts, and the volume, difficulty, effort, time and bugs",
  code: "ts",
  taking: [
    { said: "--threshold <n>", takes: "the volume a row must reach to be in the answer" },
    { said: "--top <n>", takes: "how many rows are in the answer, worst first" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Halstead counts a function's distinct and total operators and operands.",
    },
    {
      invariantKind: "departure",
      statement: "Volume, difficulty, effort, time and bugs follow from those four counts.",
    },
    {
      invariantKind: "departure",
      statement: "A type annotation and a comment are outside the counts.",
    },
    {
      invariantKind: "departure",
      statement: "A row is one function, and the rows are ordered by volume, highest first.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a body for being complex.",
    },
  ],
  name: "halstead",
  arguments: [{ argument: "argument/json" }, { argument: "argument/file-path" }],
} as const satisfies Command
