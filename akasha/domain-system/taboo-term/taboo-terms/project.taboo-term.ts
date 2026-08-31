import type { TabooTerm } from "../taboo-term.page-type.ts"

export const project = {
  id: "01a0593e-da36-7c1d-a573-f75b93cb70db",
  pageTypeSlug: "taboo-term",
  slug: "project",
  pattern: "(?<![-./$_])\\bproject\\b(?![-/_]|\\.\\w)",
  tabooSenses: [{ sense: "a unit of work serving an initiative", instead: "initiative" }],
} as const satisfies TabooTerm
