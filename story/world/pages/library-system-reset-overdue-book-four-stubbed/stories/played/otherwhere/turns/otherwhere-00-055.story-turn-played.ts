import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00055 = {
  id: "01a0e7c8-3ddc-7c98-909a-b38afe1105fd",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-055",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 55,
  turnStatus: "turn-status/game-master",
  action:
    "**Three thousand is a lot. Is there any magic available to make this faster? Telekineses? Divination? …Bookmancy? Even a library assistant?**",
  lore: ["lore/otherwhere-universe", "place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
