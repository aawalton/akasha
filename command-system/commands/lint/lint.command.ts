import type { Command } from "../command.page-type.ts"

export const lint = {
  id: "01a04edb-5f33-7000-9f46-2381be320a7b",
  pageTypeSlug: "command",
  slug: "lint",
  definition: "the command saying what the linter finds in this repository and fixing none of it",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--file-path <path>", takes: "a file or folder in the repository the linter reads" },
  ],
  helpNotes: [
    "--file-path repeats, so several paths are read in one call.",
    "named nothing, it reads every file in the repository.",
    "nothing is written — this says what the linter found and fixes none of it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run reaches no file outside this repository.",
    },
    {
      invariantKind: "departure",
      statement: "A run named nothing reads every file in this repository.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run that could not be made is answered as a failure of its own rather than as a clean tree.",
    },
    {
      invariantKind: "absence",
      statement: "A run takes no rule to turn on or off.",
    },
    {
      invariantKind: "absence",
      statement: "What is checked is what the linter is configured by.",
    },
  ],
} as const satisfies Command
