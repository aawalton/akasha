import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const paused = {
  id: "01a0593e-da33-7681-ba72-7cb86f8c8827",
  type: "page-type/taboo-term",
  slug: "paused",
  pattern: "\\bpaused\\b",
  tabooSenses: [{ sense: "a seat present but not working", instead: "present with an idle turn" }],
  createdAt: "2026-08-31T19:14:46.451Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
