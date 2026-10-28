import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const skillLockProbePlayerIronSword = {
  id: "01a17ff8-9a7f-7831-a774-cb5ce7b92bcc",
  type: "page-type/story-item",
  slug: "skill-lock-probe-player-iron-sword",
  title: "Iron Sword",
  world: "world/skill-lock-probe-world",
  story: "story-played/skill-lock-probe",
  character: "character-player/skill-lock-probe-player",
  slot: "item-slot/main-hand",

  category: "weapon",
  description: "A plain iron sword with a leather grip.",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies StoryItem
