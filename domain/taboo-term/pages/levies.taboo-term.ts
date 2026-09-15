import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const levies = {
  id: "01a0593e-da30-762a-a04b-ec0f3e98bc4f",
  type: "page-type/taboo-term",
  slug: "levies",
  pattern: "\\blevies\\b",
  tabooSenses: [{ sense: "including a thing among the set that runs", instead: "includes" }],
} as const satisfies TabooTerm
