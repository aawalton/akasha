import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperWatcherLogList = {
  id: "01a0603c-c1da-744c-8d22-01ee1ec32945",
  type: "command",
  slug: "temper-watcher-log-list",
  definition: "the command reading the workstation watcher's log lines newest first",
  code: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--since <duration>",
      takes: "how far back the records reach, said in seconds, minutes, hours or days",
    },
    { said: "--limit <n>", takes: "the most records given back" },
    { said: "--json", takes: "give one object holding every line rather than one object per line" },
    { said: "--log-dir <path>", takes: "the directory the watcher's logs are read from" },
  ],
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
} as const satisfies Command
