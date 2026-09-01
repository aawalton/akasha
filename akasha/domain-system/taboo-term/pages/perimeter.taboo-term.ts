import type { TabooTerm } from "../taboo-term.page-type.ts"

export const perimeter = {
  id: "01a0593e-da34-70f8-8e53-400e096ee007",
  pageTypeSlug: "taboo-term",
  slug: "perimeter",
  pattern: "\\bperimeter\\b",
  tabooSenses: [{ sense: "a repository's live documents as one set", instead: "live documents" }],
} as const satisfies TabooTerm
