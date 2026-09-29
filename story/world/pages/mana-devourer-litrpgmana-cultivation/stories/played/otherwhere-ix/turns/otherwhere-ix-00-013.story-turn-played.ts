import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00013 = {
  id: "01a0eb29-99be-72ee-a56e-f56c50899566",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-013",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 13,
  stepStatus: "step-status/game-master",
  action:
    "I check the quills of the beast I killed, to see if I can use them as weapons more safely than the grass.",
  lore: ["lore/otherwhere-ix-shardback"],
} as const satisfies StoryTurnPlayed
