import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const elinWiki = {
  id: "01a0b79c-5a7d-7503-9433-d4b294b29610",
  type: "page-type/initiative",
  slug: "elin-wiki",
  domain: "domain/wandering-inn-wiki",
  persona: "persona/elin",
} as const satisfies Initiative
