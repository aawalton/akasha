import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const ainePatreon = {
  id: "01a0b743-eea8-743e-826e-771bc840d92f",
  type: "page-type/initiative",
  slug: "aine-patreon",
  domain: "domain/product",
  persona: "persona/aine",
} as const satisfies Initiative
