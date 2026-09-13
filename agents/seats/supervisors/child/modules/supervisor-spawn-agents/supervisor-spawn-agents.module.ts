import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const supervisorSpawnAgents = {
  id: "01a06876-abda-7017-a0af-8bbe92c1bb1b",
  type: "module",
  slug: "supervisor-spawn-agents",
  definition: "the subagent definitions and disallowed tools a launch is given",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The definitions are composed by the compose module rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "The compose module is imported from beside this module and its function called.",
    },
    {
      invariantKind: "departure",
      statement: "A launch given no definitions is launched with the delegation tool disallowed.",
    },
    {
      invariantKind: "departure",
      statement: "An empty map is no definitions.",
    },
  ],
} as const satisfies Module
