import type { TabooTerm } from "akasha/domains/taboo-terms/taboo-term.page-type.types.ts"

export const sieve = {
  id: "01a0593e-da3c-74c4-9ded-44bfa71ce19b",
  type: "taboo-term",
  slug: "sieve",
  pattern: "\\bsieve\\b",
  tabooSenses: [
    {
      sense: "a set of rules consulted in order until one matched",
      instead: "an ordered rule set",
    },
  ],
} as const satisfies TabooTerm
