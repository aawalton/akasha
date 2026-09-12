import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measureRepo = {
  id: "01a0796e-60aa-792a-9f56-2593355a10a6",
  type: "command",
  slug: "measure-repo",
  definition: "the command counting the files the checkout has, by file type",
  code: "ts",
  parts: ["module/repo-measuring"],
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The lines each file runs to are counted beside the files.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file type is what follows the last dot in a name, and a name with no dot is its own type.",
    },
    {
      invariantKind: "departure",
      statement: "A tracked file and an untracked file the repository keeps are both counted.",
    },
    {
      invariantKind: "departure",
      statement: "The total beneath the types counts what was counted rather than what git listed.",
    },
    {
      invariantKind: "absence",
      statement:
        "A file a `generated`, `build`, `dist`, `out` or `coverage` folder holds is not counted.",
    },
    {
      invariantKind: "absence",
      statement: "A file the repository ignores is not counted.",
    },
    {
      invariantKind: "absence",
      statement: "No file is judged for being text.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
  ],
  name: "repo",
} as const satisfies Command
