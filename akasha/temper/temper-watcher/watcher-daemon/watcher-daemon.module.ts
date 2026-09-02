import type { Module } from "@akasha/code-system/module"

export const watcherDaemon = {
  id: "01a06039-9c89-7821-837a-8edf111d90af",
  pageTypeSlug: "module",
  slug: "watcher-daemon",
  definition: "the file naming the watcher worker that is running, and where that worker logs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One file names the worker that is running.",
    },
    {
      invariantKind: "departure",
      statement: "That file carries the worker's process id.",
    },
    {
      invariantKind: "departure",
      statement: "That file carries when the worker started.",
    },
    {
      invariantKind: "departure",
      statement: "That file carries the log the worker writes to.",
    },
    {
      invariantKind: "departure",
      statement: "A file the worker's shape does not fit reads as no worker.",
    },
    {
      invariantKind: "departure",
      statement: "A file that will not open reads as no worker.",
    },
    {
      invariantKind: "departure",
      statement: "That file is readable by its owner alone.",
    },
    {
      invariantKind: "departure",
      statement: "A process id that cannot be probed is taken as dead.",
    },
    {
      invariantKind: "departure",
      statement: "The worker entry is a path under the checkout rather than a built artifact.",
    },
    {
      invariantKind: "departure",
      statement: "A missing worker entry is refused as an operational fault.",
    },
  ],
} as const satisfies Module
