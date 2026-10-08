import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const governance = {
  id: "01a0593e-da2c-7374-a023-8327b0c10480",
  type: "page-type/taboo-term",
  slug: "governance",
  pattern: "\\bgovernance\\b",
  tabooSenses: [
    { sense: "what an agent must have read before it acts", instead: "required reading" },
  ],
  createdAt: "2026-08-31T19:14:46.444Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
