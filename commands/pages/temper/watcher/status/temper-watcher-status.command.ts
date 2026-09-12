import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperWatcherStatus = {
  id: "01a0603c-c1da-7d6c-b921-40b273376503",
  type: "command",
  slug: "temper-watcher-status",
  definition: "the command saying whether the workstation watcher is running",
  code: "ts",
  taking: [{ said: "--json", takes: "give the state as JSON rather than as one line" }],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A watcher that is running is reported with its process id, its uptime and its log path.",
    },
    {
      invariantKind: "departure",
      statement: "One watcher runs for the whole workstation.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the watcher is running is read from systemd.",
    },
    {
      invariantKind: "departure",
      statement:
        "How long the watcher has been up is read from the file the watcher wrote when the watcher started.",
    },
    {
      invariantKind: "departure",
      statement: "A watcher that is not running has no process id.",
    },
  ],
  name: "status",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
