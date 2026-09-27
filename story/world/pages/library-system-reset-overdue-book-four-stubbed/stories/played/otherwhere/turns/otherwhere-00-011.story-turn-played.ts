import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00011 = {
  id: "01a0e401-d650-7eb9-bdf2-938766b02965",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-011",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 11,
  turnStatus: "turn-status/game-master",
  action:
    "I go and get the salt and carry the full box if I can to outside the room where the bookworms are. Then I go back to the break room to see if I can find a container I could use to scoop and throw the salt.",
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
