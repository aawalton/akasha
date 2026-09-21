import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const elinWanderingInnWiki = {
  id: "01a0b79c-5a7d-7503-9433-d4b294b29610",
  type: "page-type/initiative",
  slug: "elin-wandering-inn-wiki",
  domain: "domain/wandering-inn-wiki",
  persona: "persona/elin",
  intentStack: [],
} as const satisfies Initiative
