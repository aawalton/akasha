import type { SubagentKind } from "akasha/agent/subagent/kind/subagent-kind.page-type.types.ts"

export const explore = {
  id: "01a06861-f664-7abd-b503-d89b310876ae",
  type: "page-type/subagent-kind",
  slug: "explore",
  definition: "a subagent that finds things in files",
  dispatchedAs: "Explore",
  model: "opus",
  subagentPrompt: "md",
  createdAt: "2026-09-03T17:47:25.668Z",
  updatedAt: "2026-10-30T14:48:42.130Z",
} as const satisfies SubagentKind
