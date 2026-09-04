import type { TabooTerm } from "../taboo-term.page-type.ts"

export const pin = {
  id: "01a0593e-da35-7884-bd93-cff8c3174eb1",
  pageTypeSlug: "taboo-term",
  slug: "pin",
  pattern: "\\bpin\\b",
  tabooSenses: [
    {
      sense: "what a seat states about itself and keeps through compaction",
      instead: "a seat attribute",
    },
  ],
} as const satisfies TabooTerm
