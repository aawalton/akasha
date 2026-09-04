import type { SubagentKind } from "../../subagent-kind.page-type.ts"

export const explore = {
  id: "01a06861-f664-7abd-b503-d89b310876ae",
  pageTypeSlug: "subagent-kind",
  slug: "explore",
  definition: "a subagent that searches a tree and reports what stands in it",
  dispatchedAs: "Explore",
  model: "opus",
  subagentPrompt: "md",
} as const satisfies SubagentKind
