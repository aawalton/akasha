import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00040 = {
  id: "01a0f453-67e1-7bf0-80aa-26b626dd35bd",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-040",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 40,
  stepStatus: "step-status/game-master",
  action:
    "I examine the tree carefully and find a safe direction to drop it in, then use my spatial rend spell to make a back wedge cut about 30 deep on the opposite side, then make the forward cut on the side it should fall on, first making sure nothing is in the fall path.",
  lore: ["lore/overwhere-iv-nala", "lore/overwhere-iv-nala-2", "place/overwhere-iv-reeves-pasture"],
} as const satisfies StoryTurnPlayed
