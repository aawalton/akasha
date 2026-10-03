import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fairweatherBerserker = {
  id: "01a102af-305c-7daf-ad12-4e40e4706b3b",
  type: "page-type/world-class",
  slug: "fairweather-berserker",
  title: "Berserker",
  world: "world/fairweather",
  description: "A fighting class whose strength comes from rage.",
} as const satisfies WorldClass
