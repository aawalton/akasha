import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const jargon = {
  id: "01a0593e-da2f-7b45-b160-1e386ab1b28a",
  type: "page-type/taboo-term",
  slug: "jargon",
  pattern: "\\bjargon\\b",
  tabooSenses: [
    {
      sense: "a word no domain defines that a plainer word could replace",
      instead: "a taboo term",
    },
  ],
  createdAt: "2026-08-31T19:14:46.447Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
