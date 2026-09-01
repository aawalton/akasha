import type { TabooTerm } from "../taboo-term.page-type.ts"

export const paused = {
  id: "01a0593e-da33-7681-ba72-7cb86f8c8827",
  pageTypeSlug: "taboo-term",
  slug: "paused",
  pattern: "\\bpaused\\b",
  tabooSenses: [{ sense: "a seat present but not working", instead: "present with an idle turn" }],
} as const satisfies TabooTerm
