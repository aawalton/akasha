import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const axis = {
  id: "01a0593e-da1e-715f-8dc8-14c2e569cebc",
  type: "page-type/taboo-term",
  slug: "axis",
  pattern: "\\baxis\\b",
  tabooSenses: [{ sense: "one thing a seat states itself on", instead: "slot" }],
  createdAt: "2026-08-31T19:14:46.430Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
