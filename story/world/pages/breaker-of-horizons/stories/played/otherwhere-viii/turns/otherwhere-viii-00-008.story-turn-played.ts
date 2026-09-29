import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereViii00008 = {
  id: "01a0eab9-f60f-7ecb-a1c8-240c23ec839d",
  type: "page-type/story-turn-played",
  slug: "otherwhere-viii-00-008",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-viii"],
  position: 8,
  stepStatus: "step-status/game-master",
  action:
    'I run to catch up with him. "Master, may I have a word? I have knowledge to share with a man of learning. I believe it would help you advance your position at the Institute."',
  lore: ["place/otherwhere-viii-guildhall"],
} as const satisfies StoryTurnPlayed
