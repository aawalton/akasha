import type { SubagentKind } from "akasha/agent/subagent/kind/subagent-kind.page-type.types.ts"

export const generalPurpose = {
  id: "01a06861-f664-72f6-990b-9e3e67ca9b90",
  type: "page-type/subagent-kind",
  slug: "general-purpose",
  definition: "a subagent for work of no particular shape",
  dispatchedAs: "general-purpose",
  subagentPrompt: "md",
  createdAt: "2026-09-03T17:47:25.668Z",
  updatedAt: "2026-09-15T17:44:01.000Z",
} as const satisfies SubagentKind
