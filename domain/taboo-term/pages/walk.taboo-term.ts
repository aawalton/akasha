import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const walk = {
  id: "01a0593e-da44-76a7-923f-2616b6699101",
  type: "page-type/taboo-term",
  slug: "walk",
  pattern: "(?<!const )(?<!return )\\bwalk\\b(?!\\s*[(=)])",
  tabooSenses: [
    { sense: "reading a document line by line", instead: "read" },
    { sense: "that reading itself", instead: "reading" },
  ],
  createdAt: "2026-08-31T19:14:46.468Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
