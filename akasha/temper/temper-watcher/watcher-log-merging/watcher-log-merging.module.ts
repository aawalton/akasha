import type { Module } from "@akasha/code-system/module"

export const watcherLogMerging = {
  id: "01a06039-9c89-7e8b-b406-28150d37543f",
  pageTypeSlug: "module",
  slug: "watcher-log-merging",
  definition: "the worker's log lines and the tray's read together, newest first",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line older than the moment handed in is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A line whose time is the moment handed in is kept.",
    },
    {
      invariantKind: "departure",
      statement: "The newest line comes first.",
    },
    {
      invariantKind: "departure",
      statement: "Two lines written at one moment are ordered by the log each line came from.",
    },
    {
      invariantKind: "departure",
      statement: "The tray comes before the worker where the moment ties.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
