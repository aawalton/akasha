import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const skillLockProbePlayerHealingDraught = {
  id: "01a17ff2-6f78-712a-a093-fa03311711d8",
  type: "page-type/story-item",
  slug: "skill-lock-probe-player-healing-draught",
  title: "Healing Draught",
  world: "world/skill-lock-probe-world",
  story: "story-played/skill-lock-probe",
  character: "character-player/skill-lock-probe-player",
  quantity: 2,
  category: "consumable",
  description: "A small corked bottle of red liquid that closes minor wounds, restoring 6 health.",
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies StoryItem
