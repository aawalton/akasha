import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorSpawnSettings = {
  id: "01a06876-abda-7019-8297-ce5c6eed4030",
  type: "page-type/module",
  slug: "supervisor-spawn-settings",
  definition: "the settings an agent spawn is composed from and written out with",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The document is read by the agent settings module rather than here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The agent settings module is imported from beside this module and its function called.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A settings document that will not read leaves the spawn carrying the per-spawn overrides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page or a file the agent settings reach for and miss refuses the spawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A document fault is told from a page fault by a mark rather than by a message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The settings are read once for a spawn rather than asked for until they answer.",
    },
  ],
} as const satisfies Module
