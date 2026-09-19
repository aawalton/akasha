import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aineAuth = {
  id: "01a0b79c-3c98-78fe-97c4-784d7dc13174",
  type: "page-type/initiative",
  slug: "aine-auth",
  domain: "domain/auth",
  persona: "persona/aine",
} as const satisfies Initiative
