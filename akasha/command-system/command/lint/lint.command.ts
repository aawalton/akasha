import type { Command } from "../command.page-type.ts"

export const lint = {
  id: "01a04edb-5f33-7000-9f46-2381be320a7b",
  pageTypeSlug: "command",
  slug: "lint",
  definition: "the command saying what the linter finds in the akasha folder and fixing none of it",
  code: "ts",
  test: "ts",
  taking: [
    { said: "--file-path <path>", takes: "a file or folder under `akasha/` the linter reads" },
  ],
  helpNotes: [
    "--file-path repeats, so several paths are read in one call.",
    "named nothing, it reads every file under `akasha/`.",
    "nothing is written — this says what the linter found and fixes none of it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run reaches no file outside the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement: "A run named nothing reads every file under the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement: "A run only reads. Nothing is fixed or formatted or written.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run that could not be made is answered as a failure of its own rather than as a tree the linter found nothing in.",
    },
    {
      invariantKind: "absence",
      statement:
        "A run takes no rule to turn on or off. What is checked is what the linter is configured by.",
    },
  ],
} as const satisfies Command
