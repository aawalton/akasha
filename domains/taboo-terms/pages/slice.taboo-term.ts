import type { TabooTerm } from "akasha/domains/taboo-terms/taboo-term.page-type.types.ts"

export const slice = {
  id: "01a0593e-da3d-7d48-bf25-2812983bde12",
  type: "taboo-term",
  slug: "slice",
  pattern: "(?<!\\.)\\bslice\\b",
  tabooSenses: [
    { sense: "the unit a run judges", instead: "line" },
    { sense: "a child initiative", instead: "child initiative" },
  ],
} as const satisfies TabooTerm
