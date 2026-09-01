import type { TabooTerm } from "../taboo-term.page-type.ts"

export const draw = {
  id: "01a0593e-da28-7579-854b-d07e8fac8f41",
  pageTypeSlug: "taboo-term",
  slug: "draw",
  pattern: "\\bdraw\\b",
  tabooSenses: [
    { sense: "a document arriving with a read or standing in a prompt", instead: "carried" },
  ],
} as const satisfies TabooTerm
