import type { TabooTerm } from "../taboo-term.page-type.ts"

export const slice = {
  id: "01a0593e-da3d-7d48-bf25-2812983bde12",
  pageTypeSlug: "taboo-term",
  slug: "slice",
  pattern: "(?<!\\.)\\bslice\\b",
  tabooSenses: [
    { sense: "the unit a run judges", instead: "line" },
    { sense: "a child initiative", instead: "child initiative" },
  ],
} as const satisfies TabooTerm
