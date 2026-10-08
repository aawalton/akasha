import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const register = {
  id: "01a0593e-da38-790c-98a2-8397d5045c9d",
  type: "page-type/taboo-term",
  slug: "register",
  pattern: "(?<![./])\\bregister\\b",
  tabooSenses: [{ sense: "how one persona speaks", instead: "voice" }],
  createdAt: "2026-08-31T19:14:46.456Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
