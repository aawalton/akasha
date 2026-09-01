import type { TabooTerm } from "../taboo-term.page-type.ts"

export const jargon = {
  id: "01a0593e-da2f-7b45-b160-1e386ab1b28a",
  pageTypeSlug: "taboo-term",
  slug: "jargon",
  pattern: "\\bjargon\\b",
  tabooSenses: [
    {
      sense: "a word no domain defines that a plainer word could replace",
      instead: "a taboo term",
    },
  ],
} as const satisfies TabooTerm
