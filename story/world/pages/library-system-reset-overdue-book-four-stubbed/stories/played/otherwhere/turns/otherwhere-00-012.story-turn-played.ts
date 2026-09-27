import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00012 = {
  id: "01a0e482-9a1f-7b07-a762-d934d5616677",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-012",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 12,
  turnStatus: "turn-status/game-master",
  action:
    "I go back to the door, fill the scoop with salt than get just close enough to fling the salt onto the nearest large bookworm before retreating back to the box",
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
