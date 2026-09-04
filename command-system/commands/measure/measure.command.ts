import type { Command } from "../command.page-type.ts"

export const measure = {
  id: "01a05827-314f-7f41-8ff3-76792d3e7ad9",
  pageTypeSlug: "command",
  slug: "measure",
  definition: "the command saying what a fleet has spent of what it is allowed",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  partSlugs: ["module/repo-measuring"],
  taking: [{ said: "<subject>", takes: "what to measure, which is `claude-accounts` or `repo`" }],
  helpNotes: [
    "the subject is the first word, and one call measures one subject.",
    "`claude-accounts` says what each account has spent of its five-hour and seven-day windows.",
    "each account's usage is read upstream first, and what is read lands beside that account.",
    "reading usage costs nothing and starts no window.",
    "renewing a token is the upkeep service's alone, so a lapsed account is passed over and named.",
    "the `>` names the account the picker would take right now.",
    "`repo` counts the files the checkout holds and the files that have arrived in akasha.",
    "`repo` counts what git counts: tracked files, and untracked files the repository keeps.",
    "what the repository ignores is not counted, so built output is no file waiting to arrive.",
    "the share `repo` says is the migration read as a fraction.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The subject is the first word.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subject this command does not measure is refused rather than measured as nothing.",
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
      invariantKind: "departure",
      statement: "What a fleet has spent is read upstream before the fleet is answered.",
    },
    {
      invariantKind: "departure",
      statement: "An account that was not refreshed is named under the numbers.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account that was not refreshed is answered from what was already beside its page.",
    },
    {
      invariantKind: "absence",
      statement: "A run renews no token.",
    },
    {
      invariantKind: "absence",
      statement: "A run starts no rate-limit window.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit holds.",
    },
  ],
} as const satisfies Command
