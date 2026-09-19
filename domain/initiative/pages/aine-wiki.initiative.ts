import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const aineWiki = {
  id: "01a0b79c-5a7d-7503-9433-d4b294b29610",
  type: "page-type/initiative",
  slug: "aine-wiki",
  domain: "domain/wandering-inn-wiki",
  persona: "persona/aine",
} as const satisfies Initiative
