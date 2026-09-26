import type { PartnersHp } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/metrics/resources/hp/partners-hp.page-type.types.ts"

export const partnersAlan = {
  id: "01a0de4a-27a1-740e-b265-5fa4e7ec1651",
  type: "page-type/partners-hp",
  slug: "partners-alan",
  character: "character-player/partners-alan",
  value: 22,
  minValue: 0,
  maxValue: 22,
  history: "jsonl",
} as const satisfies PartnersHp
