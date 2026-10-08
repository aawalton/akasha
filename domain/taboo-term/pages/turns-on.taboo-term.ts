import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const turnsOn = {
  id: "01a0593e-da40-73c4-909b-7d1db7477054",
  type: "page-type/taboo-term",
  slug: "turns-on",
  pattern: "\\bturns on\\b",
  tabooSenses: [{ sense: "one thing resting on another", instead: "depends on" }],
  createdAt: "2026-08-31T19:14:46.464Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
