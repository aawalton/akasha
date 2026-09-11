import type { TabooTerm } from "akasha/domains/taboo-terms/taboo-term.page-type.types.ts"

export const jargon = {
  id: "01a0593e-da2f-7b45-b160-1e386ab1b28a",
  type: "taboo-term",
  slug: "jargon",
  pattern: "\\bjargon\\b",
  tabooSenses: [
    {
      sense: "a word no domain defines that a plainer word could replace",
      instead: "a taboo term",
    },
  ],
} as const satisfies TabooTerm
