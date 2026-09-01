import type { TabooTerm } from "../taboo-term.page-type.ts"

export const falsified = {
  id: "01a0593e-da2a-7f4f-9150-3a203377fc97",
  pageTypeSlug: "taboo-term",
  slug: "falsified",
  pattern: "\\bfalsified\\b",
  tabooSenses: [{ sense: "made untrue by a change you landed", instead: "made untrue" }],
} as const satisfies TabooTerm
