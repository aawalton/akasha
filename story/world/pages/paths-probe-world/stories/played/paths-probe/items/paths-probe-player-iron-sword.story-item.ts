import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const pathsProbePlayerIronSword = {
  id: "01a18008-7533-735c-a60b-98617ce17746",
  type: "page-type/story-item",
  slug: "paths-probe-player-iron-sword",
  title: "Iron Sword",
  world: "world/paths-probe-world",
  story: "story-played/paths-probe",
  character: "character-player/paths-probe-player",
  slot: "item-slot/main-hand",

  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies StoryItem
