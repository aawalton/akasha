import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereX00006 = {
  id: "01a0eabc-98af-7739-83fd-666dc4acafa0",
  type: "page-type/story-turn-played",
  slug: "otherwhere-x-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-x"],
  position: 6,
  stepStatus: "step-status/game-master",
  action:
    '"I take it the bell is to invite more to come and listen? While we wait, could you tell me more about your country? I love collecting stories, so I would learn yours as well if I may."',
  lore: ["place/otherwhere-x-sulon", "lore/otherwhere-x-aldous-crane"],
} as const satisfies StoryTurnPlayed
