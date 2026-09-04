import type { TabooTerm } from "../taboo-term.page-type.ts"

export const axis = {
  id: "01a0593e-da1e-715f-8dc8-14c2e569cebc",
  pageTypeSlug: "taboo-term",
  slug: "axis",
  pattern: "\\baxis\\b",
  tabooSenses: [{ sense: "one thing a seat states itself on", instead: "slot" }],
} as const satisfies TabooTerm
