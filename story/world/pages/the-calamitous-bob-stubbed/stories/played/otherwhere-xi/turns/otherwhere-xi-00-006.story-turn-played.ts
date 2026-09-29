import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereXi00006 = {
  id: "01a0eabd-fd27-7e7b-b3c3-cfa25d9907bc",
  type: "page-type/story-turn-played",
  slug: "otherwhere-xi-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-xi"],
  position: 6,
  stepStatus: "step-status/game-master",
  action:
    "\"I'm sorry to have pulled your boy from his duties Ma'am. He mentioned that you knew the old stories, so I have come seeking your wisdom, for much truth is preserved only in old stories. What do you know of the Waystones? Are there tales of travelers who arrive at them not by any road?\"",
  lore: ["lore/otherwhere-xi-wenna-ashlar", "place/otherwhere-xi-waystone-shrine"],
} as const satisfies StoryTurnPlayed
