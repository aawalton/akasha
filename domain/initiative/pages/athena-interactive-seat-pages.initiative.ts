import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const athenaInteractiveSeatPages = {
  id: "01a0d3df-f4af-7a95-9f4c-1225394968c2",
  type: "page-type/initiative",
  slug: "athena-interactive-seat-pages",
  domain: "page-type/seat",
  persona: "persona/athena",
  intentStack: [],
} as const satisfies Initiative
