import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereViii00006 = {
  id: "01a0ea99-8f1f-76f2-9923-54e5ef36b95c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-viii-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-viii"],
  position: 6,
  stepStatus: "step-status/game-master",
  action:
    "I work my way up to the Institute. I hiked mountains for fun, so the hill doesn't scare me. I just pace myself, matching the length of my stride to the steepness to keep a steady level of effort as I go up the hill.",
  lore: ["place/otherwhere-viii-guildhall", "lore/otherwhere-viii-aiesta"],
} as const satisfies StoryTurnPlayed
