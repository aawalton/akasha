import type { Command } from "../command.page-type.ts"

export const measure = {
  id: "01a05827-314f-7f41-8ff3-76792d3e7ad9",
  pageTypeSlug: "command",
  slug: "measure",
  definition: "the command saying what a fleet has spent of what it is allowed",
  code: "ts",
  test: "ts",
  taking: [{ said: "<subject>", takes: "what to measure, which is `claude-accounts`" }],
  helpNotes: [
    "the subject is the first word, and one call measures one subject.",
    "`claude-accounts` says what each account has spent of its five-hour and seven-day windows.",
    "the numbers are read from the pages the upkeep service writes, and nothing here fetches.",
    "the `>` names the account the picker would take right now.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The subject is the first word.",
    },
    {
      invariantKind: "departure",
      statement: "`claude-accounts` is the only subject there is.",
    },
    {
      invariantKind: "departure",
      statement: "A subject this does not measure is refused rather than measured as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A fleet answered as holding nobody is the corpus being wrong.",
    },
    {
      invariantKind: "absence",
      statement: "A run only reads.",
    },
  ],
} as const satisfies Command
