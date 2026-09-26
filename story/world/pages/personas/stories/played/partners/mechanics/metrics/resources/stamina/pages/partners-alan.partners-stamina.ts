import type { PartnersStamina } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/metrics/resources/stamina/partners-stamina.page-type.types.ts"

export const partnersAlan = {
  id: "01a0de4a-27a1-7ca0-a7ac-33ab3e40433d",
  type: "page-type/partners-stamina",
  slug: "partners-alan",
  character: "character-player/partners-alan",
  value: 21,
  minValue: 0,
  maxValue: 21,
  history: "jsonl",
} as const satisfies PartnersStamina
