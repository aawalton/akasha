import type { TabooTerm } from "akasha/domains/taboo-terms/taboo-term.page-type.types.ts"

export const governance = {
  id: "01a0593e-da2c-7374-a023-8327b0c10480",
  type: "taboo-term",
  slug: "governance",
  pattern: "\\bgovernance\\b",
  tabooSenses: [
    { sense: "what an agent must have read before it acts", instead: "required reading" },
  ],
} as const satisfies TabooTerm
