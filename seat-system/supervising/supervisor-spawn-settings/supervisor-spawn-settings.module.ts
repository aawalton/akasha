import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const supervisorSpawnSettings = {
  id: "01a06876-abda-7019-8297-ce5c6eed4030",
  type: "module",
  slug: "supervisor-spawn-settings",
  definition: "the settings one agent spawn is composed from and written out with",
  code: "ts",
  test: "ts",
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
      statement:
        "A settings document that will not read leaves the spawn carrying the per-spawn overrides.",
    },
    {
      invariantKind: "departure",
      statement: "A page or a file the agent settings reach for and miss refuses the spawn.",
    },
    {
      invariantKind: "departure",
      statement: "A document fault is told from a page fault by a mark rather than by a message.",
    },
  ],
} as const satisfies Module
