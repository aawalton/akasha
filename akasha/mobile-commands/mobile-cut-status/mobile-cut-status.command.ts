import type { Command } from "@akasha/command-system/command"

export const mobileCutStatus = {
  id: "01a0685d-ceae-7003-b691-5ac97b0f647a",
  pageTypeSlug: "command",
  slug: "mobile-cut-status",
  definition: "the command saying whether a TestFlight cut is owed or the phones are current",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--app <slug>", takes: "the app to answer about, the default app where none is said" },
    { said: "--json", takes: "give the answer as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "a cut is owed where origin/main is ahead of what the last shipped cut was taken from.",
    "the comparison is against origin/main in both the code repo and the shell repo, each fetched first.",
    "a cut owed is a fact rather than a failure, so this answers plainly whichever way it falls.",
    "a last cut carrying no build-input hash predates the corrected basis, so it cannot certify the phones current.",
    "no cut on record at all leaves a cut owed, since the phones carry no build from this era.",
    "the count of commits since the last cut is worked out against origin/main rather than held anywhere.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cut owed is answered as a fact rather than as a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Origin is fetched in both repos before anything is compared.",
    },
    {
      invariantKind: "departure",
      statement: "A last cut carrying no build-input hash leaves a cut owed.",
    },
    {
      invariantKind: "departure",
      statement: "No cut on record leaves a cut owed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here builds, uploads or files anything.",
    },
  ],
} as const satisfies Command
