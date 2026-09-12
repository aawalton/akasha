import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperWatcherLogList = {
  id: "01a0603c-c1da-744c-8d22-01ee1ec32945",
  type: "command",
  slug: "temper-watcher-log-list",
  definition: "the command reading the workstation watcher's log lines newest first",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The watcher's log and the tray's log are merged into one run.",
    },
    {
      invariantKind: "departure",
      statement: "The records are given newest first.",
    },
    {
      invariantKind: "departure",
      statement: "Each record names its time, its text, the log it came from and its level.",
    },
    {
      invariantKind: "departure",
      statement: "A duration written in an unknown unit refuses the call.",
    },
  ],
  name: "log-list",
  arguments: [
    { argument: "argument/limit" },
    { argument: "argument/since" },
    { argument: "argument/log-dir" },
    { argument: "argument/json-in-one-object" },
  ],
} as const satisfies Command
