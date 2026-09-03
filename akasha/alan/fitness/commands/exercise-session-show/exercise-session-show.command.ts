import type { Command } from "@akasha/command-system/command"

export const exerciseSessionShow = {
  id: "01a0685d-b7ab-740e-bebb-d9fc659109e8",
  pageTypeSlug: "command",
  slug: "exercise-session-show",
  definition: "the command naming one session's header and every set logged against it",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--session <ref>",
      takes: "the session shown, named by id, by title or by part of either",
    },
    { said: "--json", takes: "give the session as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "the session left unsaid is the most recent one still open.",
    "the sets come grouped by movement, and within a movement by set number.",
    "a movement is named by its exercise page's title, falling back to its slug.",
    "the volume counts the bodyweight the client profile states.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The session left unsaid is the most recent one still open.",
    },
    {
      invariantKind: "departure",
      statement: "The sets are ordered by movement and then by set number.",
    },
    {
      invariantKind: "departure",
      statement: "A movement is named by its exercise page's title rather than by its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A set naming no activity is strength.",
    },
    {
      invariantKind: "departure",
      statement: "A warmup set is marked as one.",
    },
    {
      invariantKind: "departure",
      statement: "The volume is counted against the bodyweight the client profile states.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the session or its sets.",
    },
  ],
} as const satisfies Command
