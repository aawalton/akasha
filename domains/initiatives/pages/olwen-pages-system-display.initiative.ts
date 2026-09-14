import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const olwenPagesSystemDisplay = {
  id: "01a09c5d-ad56-7ae4-a258-8d26371a99bf",
  type: "initiative",
  slug: "olwen-pages-system-display",
  domain: "domain/design-interfaces-system",
  persona: "persona/olwen",
  intentStack: [],
  constraints: [
    "A component more than one page type draws with is a module each of those drawings names.",
  ],
} as const satisfies Initiative
