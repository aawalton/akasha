import type { TabooTerm } from "../taboo-term.page-type.ts"

export const substrate = {
  id: "01a0593e-da3e-74e4-82a0-944a3ab38b57",
  pageTypeSlug: "taboo-term",
  slug: "substrate",
  pattern: "\\bsubstrate\\b",
  tabooSenses: [{ sense: "the model's own default pull", instead: "the model" }],
} as const satisfies TabooTerm
