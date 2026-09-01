import type { TabooTerm } from "../taboo-term.page-type.ts"

export const corpus = {
  id: "01a0593e-da23-7013-9d2c-4b84b9e42d34",
  pageTypeSlug: "taboo-term",
  slug: "corpus",
  pattern: "\\bcorpus\\b",
  tabooSenses: [
    { sense: "a set of things treated as one body", instead: "named for what the things are" },
  ],
} as const satisfies TabooTerm
