import type { Module } from "@akasha/code-system/module"

export const supervisorInteractiveSpawn = {
  id: "01a06871-3115-7008-8fbf-3dbf3b640571",
  pageTypeSlug: "module",
  slug: "supervisor-interactive-spawn",
  definition: "the arguments a Claude child is spawned with, and the teardown after the last one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every seat condition is staged before it is awaited, so they are read together.",
    },
    {
      invariantKind: "departure",
      statement: "A model override on the options is taken over the seat's stated worker model.",
    },
    {
      invariantKind: "departure",
      statement: "A carried name that fails to bind is logged and the spawn goes on.",
    },
    {
      invariantKind: "departure",
      statement: "The proxy is stopped at exit only where no re-exec is pending.",
    },
    {
      invariantKind: "departure",
      statement: "The last cleanup runs under a force-exit timer that is always disarmed.",
    },
  ],
} as const satisfies Module
