import type { TabooTerm } from "../taboo-term.page-type.ts"

export const floor = {
  id: "01a0593e-da2b-79fb-9141-ba72e466156a",
  pageTypeSlug: "taboo-term",
  slug: "floor",
  pattern: "(?<!\\.)\\bfloor\\b",
  tabooSenses: [{ sense: "an attribute's value where nobody states one", instead: "its default" }],
} as const satisfies TabooTerm
