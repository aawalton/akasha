import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const perimeter = {
  id: "01a0593e-da34-70f8-8e53-400e096ee007",
  type: "page-type/taboo-term",
  slug: "perimeter",
  pattern: "\\bperimeter\\b",
  tabooSenses: [{ sense: "a repository's live documents as one set", instead: "live documents" }],
  createdAt: "2026-08-31T19:14:46.452Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
