import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const substrate = {
  id: "01a0593e-da3e-74e4-82a0-944a3ab38b57",
  type: "page-type/taboo-term",
  slug: "substrate",
  pattern: "\\bsubstrate\\b",
  tabooSenses: [{ sense: "the model's own default pull", instead: "the model" }],
  createdAt: "2026-08-31T19:14:46.462Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
