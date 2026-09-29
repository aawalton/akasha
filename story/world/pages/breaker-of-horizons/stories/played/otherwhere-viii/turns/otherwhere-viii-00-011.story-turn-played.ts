import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereViii00011 = {
  id: "01a0eb16-4949-7ed6-9b7c-2f38b1d84a6e",
  type: "page-type/story-turn-played",
  slug: "otherwhere-viii-00-011",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-viii"],
  position: 11,
  stepStatus: "step-status/game-master",
  action:
    '"I would be grateful for both. I\'ve long been accustomed to living where I work and I love both to learn and to teach."',
  lore: ["lore/otherwhere-viii-nala", "place/otherwhere-viii-the-workshop-room"],
} as const satisfies StoryTurnPlayed
