import type { TowerLuck } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attributes/tower-luck/tower-luck.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0c9f9-2813-75cf-8e9e-fc647f3a103e",
  type: "page-type/tower-luck",
  slug: "the-tower-alan",
  character: "character-player/the-tower-alan",
  value: 11,
  history: "jsonl",
} as const satisfies TowerLuck
