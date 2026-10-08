import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const project = {
  id: "01a0593e-da36-7c1d-a573-f75b93cb70db",
  type: "page-type/taboo-term",
  slug: "project",
  pattern: "(?<![-./$_])\\bproject\\b(?![-/_]|\\.\\w)",
  tabooSenses: [{ sense: "a unit of work serving an initiative", instead: "initiative" }],
  createdAt: "2026-08-31T19:14:46.454Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
