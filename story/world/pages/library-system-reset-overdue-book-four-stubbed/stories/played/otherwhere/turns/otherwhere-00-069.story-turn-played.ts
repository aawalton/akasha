import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00069 = {
  id: "01a0e843-ed51-7a30-89b1-ffc79de768d2",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-069",
  ownLength: 83,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 69,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/recorders",
  action: "**Links, how long until the main floor is cleared at this rate?**",
  beats: [
    "Nala asks Links, silently, how long the golems will take to clear the main level at this pace.",
    "Links answers in her head: some 2,880 loose books still lie across the hall.",
    '"Each shelver manages about twenty a day. Forty between them: seventy-two days, give or take."',
    "\"A little over two months, Librarian. They don't tire, but they don't hurry either.\"",
    "By the Counter, the first golem's arm folds back down, empty; its first book is on the high shelf.",
  ],
  lore: ["place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
