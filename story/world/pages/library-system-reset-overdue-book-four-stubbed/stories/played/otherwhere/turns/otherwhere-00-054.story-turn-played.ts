import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00054 = {
  id: "01a0e7c0-a191-785f-9949-92d701e75c52",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-054",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 54,
  turnStatus: "turn-status/game-master",
  action:
    "I take the loaf four now and eat it while I collect the clothes I left In the hall, put on what I’m missing, and take the extra robe back to my room. **Okay Links, you need more power. How do we get it for you?**",
  lore: ["lore/otherwhere-universe", "place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
