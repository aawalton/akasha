import type { Command } from "../command.page-type.ts"

export const measure = {
  id: "01a05827-314f-7f41-8ff3-76792d3e7ad9",
  pageTypeSlug: "command",
  slug: "measure",
  definition: "the command saying what a fleet has spent of what it is allowed",
  code: "ts",
  test: "ts",
  partSlugs: ["module/repo-measuring"],
  taking: [{ said: "<subject>", takes: "what to measure, which is `claude-accounts` or `repo`" }],
  helpNotes: [
    "the subject is the first word, and one call measures one subject.",
    "`claude-accounts` says what each account has spent of its five-hour and seven-day windows.",
    "the numbers are read from the pages the upkeep service writes, and nothing here fetches.",
    "the `>` names the account the picker would take right now.",
    "`repo` counts the files the checkout holds and the files that have arrived in akasha.",
    "`node_modules` and `.git` are not counted, and a symbolic link is not a file.",
    "the share `repo` says is the migration read as a fraction.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The subject is the first word.",
    },
    {
      invariantKind: "departure",
      statement: "A subject this does not measure is refused rather than measured as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A fleet answered as holding nobody is the pages being wrong.",
    },
    {
      invariantKind: "departure",
      statement: "A root holding no akasha folder is refused rather than measured as none arrived.",
    },
    {
      invariantKind: "absence",
      statement: "A run only reads.",
    },
  ],
} as const satisfies Command
