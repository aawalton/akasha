import type { TowerPerception } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-perception/tower-perception.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0c9f8-ec4a-74b0-ad14-c0a74688be68",
  type: "page-type/tower-perception",
  slug: "the-tower-alan",
  character: "character-player/the-tower-alan",
  value: 12,
  history: "jsonl",
} as const satisfies TowerPerception
