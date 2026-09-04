import type { Domain } from "../../domains/domains/domain.page-type.ts"

export const statusBar = {
  id: "01a06811-01d3-7007-b8c1-0a172fb4f158",
  pageTypeSlug: "domain",
  slug: "status-bar",
  definition: "a strip of readings Alan keeps in view while he works",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each item on the strip has its own source.",
    },
    {
      invariantKind: "absence",
      statement: "The status bar counts nothing.",
    },
  ],
} as const satisfies Domain
