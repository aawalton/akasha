import type { Module } from "@akasha/code-system/module"

export const watcherLogLine = {
  id: "01a06039-9c89-7ba8-aee4-a339fadf4824",
  pageTypeSlug: "module",
  slug: "watcher-log-line",
  definition: "one line of a temper watcher log read as its time, its level and its message",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The worker and the tray each write their own line shape.",
    },
    {
      invariantKind: "departure",
      statement: "A reader says which of the two it is reading.",
    },
    {
      invariantKind: "departure",
      statement: "A line opens with the time the line was written.",
    },
    {
      invariantKind: "departure",
      statement: "That time is written in UTC.",
    },
    {
      invariantKind: "departure",
      statement: "The worker writes that time to the millisecond and the tray to the second.",
    },
    {
      invariantKind: "departure",
      statement: "The level follows the time.",
    },
    {
      invariantKind: "departure",
      statement: "The rest of the line is the message.",
    },
    {
      invariantKind: "departure",
      statement: "A line the shape does not fit is answered as nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
