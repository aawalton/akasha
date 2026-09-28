import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereViii00002 = {
  id: "01a0ea23-8b7b-7be5-a8c1-00c4f13bdb6b",
  type: "page-type/story-turn-played",
  slug: "otherwhere-viii-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-viii"],
  position: 2,
  stepStatus: "step-status/game-master",
  action:
    '"Oh, yes sir." I say respectfully getting up. "Could you help me get oriented? I\'m not sure how I ended up here. Where am I exactly?"',
  lore: ["place/otherwhere-viii-carrowgate", "place/otherwhere-viii-weir-gardens"],
} as const satisfies StoryTurnPlayed
