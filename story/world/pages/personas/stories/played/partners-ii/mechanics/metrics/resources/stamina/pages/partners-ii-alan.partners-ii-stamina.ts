import type { PartnersIiStamina } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/metrics/resources/stamina/partners-ii-stamina.page-type.types.ts"

export const partnersIiAlan = {
  id: "01a0de49-7632-783c-95a6-00820bdaa166",
  type: "page-type/partners-ii-stamina",
  slug: "partners-ii-alan",
  character: "character-player/partners-ii-alan",
  value: 21,
  minValue: 0,
  maxValue: 21,
  history: "jsonl",
} as const satisfies PartnersIiStamina
