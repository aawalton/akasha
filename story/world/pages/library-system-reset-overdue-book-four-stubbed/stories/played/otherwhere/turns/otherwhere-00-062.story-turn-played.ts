import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00062 = {
  id: "01a0e805-8097-713c-90e1-03a9844d12b1",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-062",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 62,
  turnStatus: "turn-status/game-master",
  action:
    "**What about dress and appearance, any specific expectations around librarians I need to comply with?**",
  lore: ["lore/otherwhere-universe"],
} as const satisfies StoryTurnPlayed
