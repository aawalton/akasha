import type { TabooTerm } from "akasha/domains/taboo-terms/taboo-term.page-type.types.ts"

export const researcher = {
  id: "01a0593e-da39-7c74-a5c2-57653e309e4f",
  type: "taboo-term",
  slug: "researcher",
  pattern: "\\bresearcher\\b",
  tabooSenses: [
    { sense: "the role that read a body of material", instead: "a read-only subagent" },
  ],
} as const satisfies TabooTerm
