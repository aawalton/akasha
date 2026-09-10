import type { Command } from "../../../../command.page-type.types.ts"

export const measureComplexityHalstead = {
  id: "01a08ccd-7cd6-78a7-b5f2-66cdcd08bc68",
  pageTypeSlug: "command",
  type: "command",
  slug: "measure-complexity-halstead",
  definition: "each function's token counts, and the volume, difficulty, effort, time and bugs",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--file <path>", takes: "the one file to read, said from the repository root" },
    { said: "--threshold <n>", takes: "the volume a row must reach to be in the answer" },
    { said: "--top <n>", takes: "how many rows are in the answer, worst first" },
    { said: "--json", takes: "the rows as one line of JSON rather than as tab-separated columns" },
  ],
  helpNotes: [
    "halstead counts the distinct and the total operators and operands of a function, and volume, difficulty, effort, time and bugs follow from those four.",
    "type annotations and comments sit outside the halstead counts.",
    "a row is one function, worst first, and worst is the highest volume.",
    "an answer is figures rather than violations, so nothing here refuses a body for being complex.",
  ],
} as const satisfies Command
