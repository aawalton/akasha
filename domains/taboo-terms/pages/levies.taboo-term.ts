import type { TabooTerm } from "akasha/domains/taboo-terms/taboo-term.page-type.types.ts"

export const levies = {
  id: "01a0593e-da30-762a-a04b-ec0f3e98bc4f",
  type: "taboo-term",
  slug: "levies",
  pattern: "\\blevies\\b",
  tabooSenses: [{ sense: "including a thing among the set that runs", instead: "includes" }],
} as const satisfies TabooTerm
