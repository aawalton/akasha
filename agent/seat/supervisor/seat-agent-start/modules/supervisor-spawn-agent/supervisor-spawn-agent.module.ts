import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorSpawnAgent = {
  id: "01a06876-abda-7017-a0af-8bbe92c1bb1b",
  type: "page-type/module",
  slug: "supervisor-spawn-agent",
  definition: "the subagent definitions and disallowed tools a launch is given",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The definitions are composed by the compose module rather than here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The compose module is imported from beside this module and its function called.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A launch given no definitions is launched with the delegation tool disallowed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty map is no definitions.",
    },
  ],
} as const satisfies Module
