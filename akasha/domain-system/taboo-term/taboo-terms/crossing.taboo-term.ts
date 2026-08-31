import type { TabooTerm } from "../taboo-term.page-type.ts"

export const crossing = {
  id: "01a0593e-da24-7507-89fe-fb1e3c808198",
  pageTypeSlug: "taboo-term",
  slug: "crossing",
  pattern: "\\bcrossing\\b",
  tabooSenses: [
    { sense: "a pipeline", instead: "pipeline" },
    { sense: "a coupling", instead: "coupling" },
    { sense: "a narrowing", instead: "narrowing" },
    { sense: "a resolution", instead: "resolution" },
  ],
} as const satisfies TabooTerm
