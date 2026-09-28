import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00007 = {
  id: "01a0ea46-a941-741a-8981-afa0e7bdcd50",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 7,
  stepStatus: "step-status/game-master",
  action:
    '"Of course. As a spirit of knowledge, I am always happy for honest questions, and answering them is the least I can do for the hospitality you have already given."',
  lore: [
    "lore/otherwhere-iv-gu-household",
    "lore/otherwhere-iv-nala",
    "lore/otherwhere-iv-calendar",
  ],
  endsAt: "2026-09-28T08:34:00.000Z",
} as const satisfies StoryTurnPlayed
