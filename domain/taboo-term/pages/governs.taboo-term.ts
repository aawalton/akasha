import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const governs = {
  id: "01a0593e-da2d-71c2-bc1a-8ec8f4837dab",
  type: "page-type/taboo-term",
  slug: "governs",
  pattern: "\\bgoverns\\b",
  tabooSenses: [{ sense: "a document's rules reaching a path", instead: "required reading" }],
  createdAt: "2026-08-31T19:14:46.445Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
