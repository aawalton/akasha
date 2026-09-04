import type { TabooTerm } from "../taboo-term.page-type.ts"

export const claim = {
  id: "01a0593e-da20-703d-8900-4ddbe68d5236",
  pageTypeSlug: "taboo-term",
  slug: "claim",
  pattern: '(?<![-/.])\\bclaim\\b(?![:"])',
  tabooSenses: [
    {
      sense: "a page type or a document taking a path",
      instead: "what it is required reading for",
    },
  ],
} as const satisfies TabooTerm
