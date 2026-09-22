import type { TowerMana } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/resources/tower-mana/tower-mana.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0c9f1-b8f8-7d2a-bc00-1a08fa84c77c",
  type: "page-type/tower-mana",
  slug: "the-tower-alan",
  character: "character-player/the-tower-alan",
  value: 104,
  minValue: 0,
  maxValue: 120,
} as const satisfies TowerMana
