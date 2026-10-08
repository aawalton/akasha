import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const corpus = {
  id: "01a0593e-da23-7013-9d2c-4b84b9e42d34",
  type: "page-type/taboo-term",
  slug: "corpus",
  pattern: "\\bcorpus\\b",
  tabooSenses: [
    { sense: "a set of things treated as one body", instead: "named for what the things are" },
  ],
  createdAt: "2026-08-31T19:14:46.435Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
