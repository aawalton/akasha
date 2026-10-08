import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const mints = {
  id: "01a0593e-da31-7d51-a695-e32fead3975b",
  type: "page-type/taboo-term",
  slug: "mints",
  pattern: "\\bmints\\b",
  tabooSenses: [{ sense: "starting a pipeline run", instead: "starts" }],
  createdAt: "2026-08-31T19:14:46.449Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
