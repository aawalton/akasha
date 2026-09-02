import type { Module } from "@akasha/code-system/module"

export const watcherImportErrors = {
  id: "01a06381-35cf-7a59-98a9-0d96ea20a841",
  pageTypeSlug: "module",
  slug: "watcher-import-errors",
  definition:
    "the watcher's handling of a saved errors file, from reading it to logging what is new",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every error in the file is judged before any error is carried up.",
    },
    {
      invariantKind: "departure",
      statement:
        "An error is judged stale against the latest moment any error in the file was seen.",
    },
    {
      invariantKind: "departure",
      statement: "Every addon is judged as though outside the repository.",
    },
    {
      invariantKind: "departure",
      statement: "Recency alone makes an error stale.",
    },
    {
      invariantKind: "departure",
      statement: "An error unseen for twenty-four hours is stale.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may name another span in place of the twenty-four hours.",
    },
    {
      invariantKind: "departure",
      statement: "An error left unjudged is carried up rather than held back.",
    },
    {
      invariantKind: "departure",
      statement: "The cursor is saved before any line reaches the log.",
    },
    {
      invariantKind: "departure",
      statement: "How many errors were held back is logged before any error is logged.",
    },
    {
      invariantKind: "departure",
      statement: "Every error carried up is logged as one line of json.",
    },
    {
      invariantKind: "departure",
      statement: "The count of errors carried up is logged after every envelope.",
    },
    {
      invariantKind: "departure",
      statement: "A run carrying nothing up logs that nothing was new or had recurred.",
    },
    {
      invariantKind: "departure",
      statement: "One addon's build id file is read once for a whole run.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may name the cursor file.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may name what is logged to.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may name where a build id is read from.",
    },
    {
      invariantKind: "departure",
      statement: "The watcher's own log is written where the caller names no log.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides which errors are carried up.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens the saved errors file.",
    },
  ],
} as const satisfies Module
