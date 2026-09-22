import type { TowerPresence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attributes/tower-presence/tower-presence.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0c9f9-0d69-75c7-befb-850eb3f3366e",
  type: "page-type/tower-presence",
  slug: "the-tower-alan",
  character: "character-player/the-tower-alan",
  value: 16,
  history: "jsonl",
} as const satisfies TowerPresence
