import type { TabooTerm } from "../taboo-term.page-type.ts"

export const sieve = {
  id: "01a0593e-da3c-74c4-9ded-44bfa71ce19b",
  pageTypeSlug: "taboo-term",
  slug: "sieve",
  pattern: "\\bsieve\\b",
  tabooSenses: [
    {
      sense: "a set of rules consulted in order until one matched",
      instead: "an ordered rule set",
    },
  ],
} as const satisfies TabooTerm
