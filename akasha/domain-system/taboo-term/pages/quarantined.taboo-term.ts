import type { TabooTerm } from "../taboo-term.page-type.ts"

export const quarantined = {
  id: "01a0593e-da37-7791-aeca-8c7edc8efebe",
  pageTypeSlug: "taboo-term",
  slug: "quarantined",
  pattern: "\\bquarantined\\b",
  tabooSenses: [{ sense: "held under `dirty/`, binding nobody", instead: "under `dirty/`" }],
} as const satisfies TabooTerm
