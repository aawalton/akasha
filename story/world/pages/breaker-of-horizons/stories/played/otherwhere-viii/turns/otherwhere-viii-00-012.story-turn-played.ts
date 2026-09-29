import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereViii00012 = {
  id: "01a0eb28-cc7f-7829-b15c-1c51d321a8ee",
  type: "page-type/story-turn-played",
  slug: "otherwhere-viii-00-012",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-viii"],
  position: 12,
  stepStatus: "step-status/game-master",
  action: "I follow the Master back down and get to work.",
  lore: [
    "lore/otherwhere-viii-nala",
    "place/otherwhere-viii-the-workshop",
    "place/otherwhere-viii-the-workshop-room",
  ],
} as const satisfies StoryTurnPlayed
