import type { Module } from "@akasha/code-system/module"

export const syncRunRecording = {
  id: "01a0686c-fd2c-7002-a269-4f47fac2fd46",
  pageTypeSlug: "module",
  slug: "sync-run-recording",
  definition: "a sync run opened, settled and recorded against the sync it ran for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run is recorded as running before the sync it records is started.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw is recorded as failed and the throw carries on outward.",
    },
    {
      invariantKind: "departure",
      statement: "A run terminated by a signal is recorded as failed before the process ends.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run left open longer than seven hours by a process that died is closed as failed by the next run.",
    },
    {
      invariantKind: "departure",
      statement: "A run that failed an item is a failed run however much else it filed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record that will not land is said on the console rather than failing the sync it records.",
    },
    {
      invariantKind: "gap",
      statement:
        "This is reached by the wandering inn sync alone, and the great courses and royal road syncs record no run at all.",
    },
  ],
} as const satisfies Module
