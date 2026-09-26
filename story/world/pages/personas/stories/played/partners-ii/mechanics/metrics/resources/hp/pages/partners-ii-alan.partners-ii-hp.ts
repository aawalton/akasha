import type { PartnersIiHp } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/metrics/resources/hp/partners-ii-hp.page-type.types.ts"

export const partnersIiAlan = {
  id: "01a0de49-7632-7b3e-90c8-9467fe99b179",
  type: "page-type/partners-ii-hp",
  slug: "partners-ii-alan",
  character: "character-player/partners-ii-alan",
  value: 22,
  minValue: 0,
  maxValue: 22,
  history: "jsonl",
} as const satisfies PartnersIiHp
