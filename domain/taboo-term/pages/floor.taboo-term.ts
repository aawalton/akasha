import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const floor = {
  id: "01a0593e-da2b-79fb-9141-ba72e466156a",
  type: "page-type/taboo-term",
  slug: "floor",
  pattern: "(?<!\\.)\\bfloor\\b",
  tabooSenses: [{ sense: "an attribute's value where nobody states one", instead: "its default" }],
  createdAt: "2026-08-31T19:14:46.443Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
