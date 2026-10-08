import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const cohort = {
  id: "01a0593e-da21-72ed-985b-e5a9ece68f89",
  type: "page-type/taboo-term",
  slug: "cohort",
  pattern: "\\bcohort\\b",
  tabooSenses: [
    { sense: "everything an instrument looked at", instead: "the instrument population" },
  ],
  createdAt: "2026-08-31T19:14:46.433Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
