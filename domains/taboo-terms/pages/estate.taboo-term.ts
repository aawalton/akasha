import type { TabooTerm } from "../taboo-term.page-type.ts"

export const estate = {
  id: "01a0593e-da29-70a5-9d07-2f90e977c9e2",
  pageTypeSlug: "taboo-term",
  slug: "estate",
  pattern: "\\bestate\\b",
  tabooSenses: [{ sense: "everything a system comprises", instead: "the fleet or this system" }],
} as const satisfies TabooTerm
