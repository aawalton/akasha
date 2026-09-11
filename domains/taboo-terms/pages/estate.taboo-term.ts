import type { TabooTerm } from "akasha/domains/taboo-terms/taboo-term.page-type.types.ts"

export const estate = {
  id: "01a0593e-da29-70a5-9d07-2f90e977c9e2",
  type: "taboo-term",
  slug: "estate",
  pattern: "\\bestate\\b",
  tabooSenses: [{ sense: "everything a system comprises", instead: "the fleet or this system" }],
} as const satisfies TabooTerm
