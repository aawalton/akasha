import type { Command } from "../../../command.page-type.ts"

export const measureRepo = {
  id: "01a0796e-60aa-792a-9f56-2593355a10a6",
  pageTypeSlug: "command",
  type: "command",
  slug: "measure-repo",
  definition: "the command counting the files the checkout has, by file type",
  code: "ts",
  changeKind: "change-mechanical",
  parts: ["module/repo-measuring", "module/checkout-counting"],
  taking: [],
  helpNotes: [
    "`repo` counts the files the checkout holds and the lines those files run to, by file type.",
    "a file type is what follows the last dot in a name, and a name with no dot is its own type.",
    "a file a `generated`, `build`, `dist`, `out` or `coverage` folder holds is not counted.",
    "no file is judged for being text, so a font counts whatever newlines its bytes hold.",
    "the total beneath the types counts what was counted rather than what git listed.",
    "what git counts is counted: tracked files, and untracked files the repository keeps.",
    "what the repository ignores is not counted, so built output is no file waiting to arrive.",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
  ],
} as const satisfies Command
