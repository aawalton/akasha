import type { PartnersFocus } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/metrics/resources/focus/partners-focus.page-type.types.ts"

export const partnersAlan = {
  id: "01a0de4a-27a1-78f8-a94e-b4607c44d175",
  type: "page-type/partners-focus",
  slug: "partners-alan",
  character: "character-player/partners-alan",
  value: 23,
  minValue: 0,
  maxValue: 23,
  history: "jsonl",
} as const satisfies PartnersFocus
