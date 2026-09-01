import type { TabooTerm } from "../taboo-term.page-type.ts"

export const stand = {
  id: "01a05cfe-1cad-7674-ab61-e3865ae14bae",
  pageTypeSlug: "taboo-term",
  slug: "stand",
  pattern: "(?<![a-z])(stands?|standing|stood)(?![a-z])",
  tabooSenses: [
    { sense: "being in a place", instead: "is, sits, or is beside" },
    { sense: "existing at all", instead: "exists, or is there" },
    { sense: "remaining as it was", instead: "remains, or as it is" },
    { sense: "representing something else", instead: "represents" },
    { sense: "putting something up", instead: "sets up, or puts up" },
    { sense: "being the only one", instead: "is alone, or is the only one" },
  ],
} as const satisfies TabooTerm
