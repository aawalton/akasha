import type { Module } from "@akasha/code-system/module"

export const supervisorSpawnAgents = {
  id: "01a06876-abda-7017-a0af-8bbe92c1bb1b",
  pageTypeSlug: "module",
  slug: "supervisor-spawn-agents",
  definition: "the subagent definitions and disallowed tools a launch is given",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The definitions are composed by a child, killed at a ceiling, rather than here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The compose module is reached beside this one rather than by a path from the root.",
    },
    {
      invariantKind: "departure",
      statement: "A launch given no definitions is launched with the delegation tool disallowed.",
    },
    {
      invariantKind: "departure",
      statement:
        "An empty map is no definitions, because a seat given one would delegate to nothing.",
    },
  ],
} as const satisfies Module
