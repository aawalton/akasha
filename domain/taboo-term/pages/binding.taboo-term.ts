import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const binding = {
  id: "01a0593e-da1f-7abd-a0cb-9470f811831b",
  type: "page-type/taboo-term",
  slug: "binding",
  pattern: "\\bbinding\\b",
  tabooSenses: [{ sense: "the documents a seat is held to", instead: "its required reading" }],
  createdAt: "2026-08-31T19:14:46.431Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
