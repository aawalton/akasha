import type { TabooTerm } from "../taboo-term.page-type.ts"

export const cohort = {
  id: "01a0593e-da21-72ed-985b-e5a9ece68f89",
  pageTypeSlug: "taboo-term",
  slug: "cohort",
  pattern: "\\bcohort\\b",
  tabooSenses: [
    { sense: "everything an instrument looked at", instead: "the instrument population" },
  ],
} as const satisfies TabooTerm
