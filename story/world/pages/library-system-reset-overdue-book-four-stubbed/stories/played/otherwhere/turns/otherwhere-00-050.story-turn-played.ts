import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00050 = {
  id: "01a0e5da-22bc-701a-a095-1208d77e2e33",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-050",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 50,
  turnStatus: "turn-status/game-master",
  action:
    "I pick up the worm, take it back to the break room, and put it in the cooler with the others. As I walk back to my room, I think to Links, **Can we afford hot water now? I really need a hot shower**",
  lore: ["place/otherwhere-hall-back", "place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
