import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const researcher = {
  id: "01a0593e-da39-7c74-a5c2-57653e309e4f",
  type: "page-type/taboo-term",
  slug: "researcher",
  pattern: "\\bresearcher\\b",
  tabooSenses: [
    { sense: "the role that read a body of material", instead: "a read-only subagent" },
  ],
  createdAt: "2026-08-31T19:14:46.457Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
