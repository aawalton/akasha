import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const wake = {
  id: "01a0593e-da43-7af8-992a-9a0a58be265f",
  type: "page-type/taboo-term",
  slug: "wake",
  pattern: "\\bwak(e|es|ed|ing)\\b|\\bwoken?\\b",
  tabooSenses: [
    {
      sense: "a message that earned the start of a stopped seat",
      instead: "any message starts one",
    },
    {
      sense: "the paths a check runs on",
      instead: "its input",
    },
  ],
  createdAt: "2026-08-31T19:14:46.467Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
