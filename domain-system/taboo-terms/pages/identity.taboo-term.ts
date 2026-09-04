import type { TabooTerm } from "../taboo-term.page-type.ts"

export const identity = {
  id: "01a0593e-da2e-7138-980e-60713a5f4dca",
  pageTypeSlug: "taboo-term",
  slug: "identity",
  pattern: '(?<![-.])\\bidentity\\b(?![/"])',
  tabooSenses: [
    {
      sense: "who a seat is and what it must read",
      instead: "its attributes and what is required for them",
    },
  ],
  keptSenses: [
    "the identifier a page or a row is told apart from every other by",
    "the marks and colors a brand is known by",
  ],
} as const satisfies TabooTerm
