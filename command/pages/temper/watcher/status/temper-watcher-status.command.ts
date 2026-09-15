import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperWatcherStatus = {
  id: "01a0603c-c1da-7d6c-b921-40b273376503",
  type: "command",
  slug: "temper-watcher-status",
  definition: "the command saying whether the workstation watcher is running",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A watcher that is running is reported with its process id, its uptime and its log path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One watcher runs for the whole workstation.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether the watcher is running is read from systemd.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "How long the watcher has been up is read from the file the watcher wrote when the watcher started.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A watcher that is not running has no process id.",
    },
  ],
  name: "status",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
