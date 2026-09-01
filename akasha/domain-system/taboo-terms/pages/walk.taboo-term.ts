import type { TabooTerm } from "../taboo-term.page-type.ts"

export const walk = {
  id: "01a0593e-da44-76a7-923f-2616b6699101",
  pageTypeSlug: "taboo-term",
  slug: "walk",
  pattern: "(?<!const )(?<!return )\\bwalk\\b(?!\\s*[(=)])",
  tabooSenses: [
    { sense: "reading a document line by line", instead: "read" },
    { sense: "that reading itself", instead: "reading" },
  ],
} as const satisfies TabooTerm
