import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureComplexityMaintainability = {
  id: "01a08ccd-ace4-705b-8318-42e706de96ae",
  pageTypeSlug: "command",
  type: "command",
  slug: "measure-complexity-maintainability",
  definition: "the maintainability index of each file of a checkout's TypeScript",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--file <path>", takes: "the one file to read, said from the repository root" },
    { said: "--threshold <n>", takes: "the index a row must be at or under to be in the answer" },
    { said: "--top <n>", takes: "how many rows are in the answer, worst first" },
    { said: "--json", takes: "the rows as one line of JSON rather than as tab-separated columns" },
  ],
  helpNotes: [
    "the maintainability index is the Visual Studio variant over halstead volume, the cyclomatic sum and the source lines a file holds.",
    "blank lines and comment-only lines are no source line.",
    "the index rises as a file shortens, so splitting one function in two raises it though neither the decision points nor the vocabulary changed.",
    "a row is one file, worst first, and worst is the lowest index, so the threshold is a ceiling here rather than a floor.",
  ],
} as const satisfies Command
