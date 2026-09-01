import type { TabooTerm } from "../taboo-term.page-type.ts"

export const mints = {
  id: "01a0593e-da31-7d51-a695-e32fead3975b",
  pageTypeSlug: "taboo-term",
  slug: "mints",
  pattern: "\\bmints\\b",
  tabooSenses: [{ sense: "starting a pipeline run", instead: "starts" }],
} as const satisfies TabooTerm
