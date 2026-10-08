import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const sieve = {
  id: "01a0593e-da3c-74c4-9ded-44bfa71ce19b",
  type: "page-type/taboo-term",
  slug: "sieve",
  pattern: "\\bsieve\\b",
  tabooSenses: [
    {
      sense: "a set of rules consulted in order until one matched",
      instead: "an ordered rule set",
    },
  ],
  createdAt: "2026-08-31T19:14:46.460Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
