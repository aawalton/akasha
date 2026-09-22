import type { TowerVitality } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attributes/tower-vitality/tower-vitality.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0c9f8-cc62-78ab-bd95-5c9fe2abf9af",
  type: "page-type/tower-vitality",
  slug: "the-tower-alan",
  character: "character-player/the-tower-alan",
  value: 12,
  history: "jsonl",
} as const satisfies TowerVitality
