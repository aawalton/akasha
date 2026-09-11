import type { TabooTerm } from "akasha/domains/taboo-terms/taboo-term.page-type.types.ts"

export const register = {
  id: "01a0593e-da38-790c-98a2-8397d5045c9d",
  type: "taboo-term",
  slug: "register",
  pattern: "(?<![./])\\bregister\\b",
  tabooSenses: [{ sense: "how one persona speaks", instead: "voice" }],
} as const satisfies TabooTerm
