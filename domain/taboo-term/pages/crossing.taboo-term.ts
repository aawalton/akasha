import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const crossing = {
  id: "01a0593e-da24-7507-89fe-fb1e3c808198",
  type: "page-type/taboo-term",
  slug: "crossing",
  pattern: "\\bcrossing\\b",
  tabooSenses: [
    { sense: "a pipeline", instead: "pipeline" },
    { sense: "a coupling", instead: "coupling" },
    { sense: "a narrowing", instead: "narrowing" },
    { sense: "a resolution", instead: "resolution" },
  ],
  createdAt: "2026-08-31T19:14:46.436Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
