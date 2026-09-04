import type { TabooTerm } from "../taboo-term.page-type.ts"

export const governs = {
  id: "01a0593e-da2d-71c2-bc1a-8ec8f4837dab",
  pageTypeSlug: "taboo-term",
  slug: "governs",
  pattern: "\\bgoverns\\b",
  tabooSenses: [{ sense: "a document's rules reaching a path", instead: "required reading" }],
} as const satisfies TabooTerm
