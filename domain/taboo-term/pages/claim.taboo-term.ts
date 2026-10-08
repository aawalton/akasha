import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const claim = {
  id: "01a0593e-da20-703d-8900-4ddbe68d5236",
  type: "page-type/taboo-term",
  slug: "claim",
  pattern: '(?<![-/.])\\bclaim\\b(?![:"])',
  tabooSenses: [
    {
      sense: "a page type or a document taking a path",
      instead: "what it is required reading for",
    },
  ],
  createdAt: "2026-08-31T19:14:46.432Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
