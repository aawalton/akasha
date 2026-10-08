import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const quarantined = {
  id: "01a0593e-da37-7791-aeca-8c7edc8efebe",
  type: "page-type/taboo-term",
  slug: "quarantined",
  pattern: "\\bquarantined\\b",
  tabooSenses: [{ sense: "held under `dirty/`, binding nobody", instead: "under `dirty/`" }],
  createdAt: "2026-08-31T19:14:46.455Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
