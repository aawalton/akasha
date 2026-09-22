import type { TowerWill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attributes/tower-will/tower-will.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0c9f8-fb8d-7971-b49a-a6920c686010",
  type: "page-type/tower-will",
  slug: "the-tower-alan",
  character: "character-player/the-tower-alan",
  value: 20,
} as const satisfies TowerWill
