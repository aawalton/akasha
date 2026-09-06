import type { Module } from "@akasha/code/module"

export const supervisorSpawnSettings = {
  id: "01a06876-abda-7019-8297-ce5c6eed4030",
  pageTypeSlug: "module",
  slug: "supervisor-spawn-settings",
  definition: "the settings one agent spawn is composed from and written out with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The document is read by the agent settings module rather than here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The agent settings module is imported from beside this module and its function called.",
    },
    {
      invariantKind: "departure",
      statement: "A read that throws leaves the spawn carrying only its per-spawn overrides.",
    },
  ],
} as const satisfies Module
