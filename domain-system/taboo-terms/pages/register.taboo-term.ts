import type { TabooTerm } from "../taboo-term.page-type.ts"

export const register = {
  id: "01a0593e-da38-790c-98a2-8397d5045c9d",
  pageTypeSlug: "taboo-term",
  slug: "register",
  pattern: "(?<![./])\\bregister\\b",
  tabooSenses: [{ sense: "how one persona speaks", instead: "voice" }],
} as const satisfies TabooTerm
