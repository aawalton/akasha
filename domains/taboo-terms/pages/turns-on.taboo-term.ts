import type { TabooTerm } from "../taboo-term.page-type.types.ts"

export const turnsOn = {
  id: "01a0593e-da40-73c4-909b-7d1db7477054",
  pageTypeSlug: "taboo-term",
  type: "taboo-term",
  slug: "turns-on",
  pattern: "\\bturns on\\b",
  tabooSenses: [{ sense: "one thing resting on another", instead: "depends on" }],
} as const satisfies TabooTerm
