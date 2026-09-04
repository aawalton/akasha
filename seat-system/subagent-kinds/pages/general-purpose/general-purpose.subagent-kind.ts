import type { SubagentKind } from "../../subagent-kind.page-type.ts"

export const generalPurpose = {
  id: "01a06861-f664-72f6-990b-9e3e67ca9b90",
  pageTypeSlug: "subagent-kind",
  slug: "general-purpose",
  definition: "a subagent for work of no particular shape",
  dispatchedAs: "general-purpose",
  subagentPrompt: "md",
} as const satisfies SubagentKind
