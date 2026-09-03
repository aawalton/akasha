import type { Module } from "@akasha/code-system/module"

export const supervisorSpawnAgents = {
  id: "01a06876-abda-7017-a0af-8bbe92c1bb1b",
  pageTypeSlug: "module",
  slug: "supervisor-spawn-agents",
  definition: "the subagent definitions and disallowed tools a launch is given",
  code: "ts",
} as const satisfies Module
