import type { TowerStamina } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/resources/tower-stamina/tower-stamina.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0c9f1-d86d-78e9-a1c4-ca2cbdb02c02",
  type: "page-type/tower-stamina",
  slug: "the-tower-alan",
  character: "character-player/the-tower-alan",
  value: 48,
  minValue: 0,
  maxValue: 76,
} as const satisfies TowerStamina
