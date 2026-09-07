import type { Command } from "@akasha/command-system/command"

export const temperWatcherLogs = {
  id: "01a0603c-c1da-744c-8d22-01ee1ec32945",
  pageTypeSlug: "command",
  slug: "temper-watcher-logs",
  definition: "the command reading the workstation watcher's log lines newest first",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--since <duration>",
      takes: "how far back the records reach, said in seconds, minutes, hours or days",
    },
    { said: "--limit <n>", takes: "the most records given back" },
    { said: "--json", takes: "give one object holding every line rather than one object per line" },
    { said: "--log-dir <path>", takes: "the directory the watcher's logs are read from" },
  ],
  helpNotes: [
    "the watcher's own log and the tray's log are merged into one run newest first.",
    "each record carries when it was written, what it said, which log it came from, and its level.",
    "a duration whose unit this does not carry is refused by name.",
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
      statement: "Each record names the log the record came from.",
    },
    {
      invariantKind: "departure",
      statement: "A duration written in an unknown unit refuses the call.",
    },
  ],
} as const satisfies Command
