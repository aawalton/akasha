import type { TabooTerm } from "../taboo-term.page-type.ts"

export const governance = {
  id: "01a0593e-da2c-7374-a023-8327b0c10480",
  pageTypeSlug: "taboo-term",
  slug: "governance",
  pattern: "\\bgovernance\\b",
  tabooSenses: [
    { sense: "what an agent must have read before it acts", instead: "required reading" },
  ],
} as const satisfies TabooTerm
