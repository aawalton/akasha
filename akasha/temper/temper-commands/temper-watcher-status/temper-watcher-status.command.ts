import type { Command } from "@akasha/command-system/command"

export const temperWatcherStatus = {
  id: "01a0603c-c1da-7d6c-b921-40b273376503",
  pageTypeSlug: "command",
  slug: "temper-watcher-status",
  definition: "the command saying whether the workstation watcher is running",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "--json", takes: "give the state as JSON rather than as one line" }],
  helpNotes: [
    "one watcher runs for the whole workstation, so there is one state to report.",
    "a watcher that is running carries its process id, how long it has been up, and where its log is.",
    "whether it is running is read from systemd rather than from a file it wrote.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One watcher runs for the whole workstation.",
    },
    {
      invariantKind: "departure",
      statement: "Whether it is running is read from systemd.",
    },
    {
      invariantKind: "departure",
      statement: "How long it has been up is read from what it wrote when it started.",
    },
    {
      invariantKind: "departure",
      statement: "A watcher that is not running carries no process id.",
    },
  ],
} as const satisfies Command
