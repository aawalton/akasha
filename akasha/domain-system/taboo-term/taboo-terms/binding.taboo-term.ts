import type { TabooTerm } from "../taboo-term.page-type.ts"

export const binding = {
  id: "01a0593e-da1f-7abd-a0cb-9470f811831b",
  pageTypeSlug: "taboo-term",
  slug: "binding",
  pattern: "\\bbinding\\b",
  tabooSenses: [{ sense: "the documents a seat is held to", instead: "its required reading" }],
} as const satisfies TabooTerm
