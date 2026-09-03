import type { Command } from "@akasha/command-system/command"

export const aliFold = {
  id: "01a06862-5a9b-74e1-858b-d7c1daad27f3",
  pageTypeSlug: "command",
  slug: "ali-fold",
  definition: "the command folding depth up the Book of Everything into every topic's coverage",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--dry-run", takes: "say which topics would change without writing any of them" },
    { said: "--json", takes: "give what changed as one line of JSON rather than as lines" },
  ],
  helpNotes: [
    "depth is judged by hand and coverage is never judged, so this works coverage out and writes nothing else.",
    "a leaf's coverage is its own depth; a topic above weighs its own depth and the mean of the topics under it equally.",
    "a topic whose coverage already reads what the fold works out is left alone, so a settled book writes nothing.",
    "the dashboard record is rewritten whole from the fold rather than edited.",
    "this is the depth axis; `akasha ali-coverage` says how much has been opened at all.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Coverage is worked out from depth rather than read from anywhere.",
    },
    {
      invariantKind: "departure",
      statement: "A leaf's coverage is its own depth.",
    },
    {
      invariantKind: "departure",
      statement: "A topic weighs its own depth and the mean of the topics under it equally.",
    },
    {
      invariantKind: "departure",
      statement: "A coverage is held to two decimal places.",
    },
    {
      invariantKind: "departure",
      statement: "A topic already carrying what the fold works out is not written.",
    },
    {
      invariantKind: "departure",
      statement: "The dashboard is written whenever anything is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a depth or a status.",
    },
  ],
} as const satisfies Command
