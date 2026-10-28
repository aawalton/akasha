import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const timeProbePlayerIronSword = {
  id: "01a1802d-b13e-7bc1-bf39-b984be73aa96",
  type: "page-type/story-item",
  slug: "time-probe-player-iron-sword",
  title: "Iron Sword",
  world: "world/time-probe-world",
  story: "story-played/time-probe",
  character: "character-player/time-probe-player",
  slot: "item-slot/main-hand",

  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies StoryItem
