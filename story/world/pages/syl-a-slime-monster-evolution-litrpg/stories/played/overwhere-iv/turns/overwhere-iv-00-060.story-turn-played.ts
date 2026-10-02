import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00060 = {
  id: "01a0fdb3-1333-72d3-b649-a70fc3332c1d",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-060",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 60,
  stepStatus: "step-status/game-master",
  action:
    "“I’ll hunt the wolf today” I get directions to the old quarry and follow them, then close my eyes and focus on navigating by spacial sense. If I find any wolves, I use Rend on their throats with my eyes still closed.",
  lore: [
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "place/overwhere-iv-crake-gill",
    "place/overwhere-iv-crowstone-quarry",
    "place/overwhere-iv-north-west-pastures",
  ],
  endsAt: "2026-10-04T14:20:00.000Z",
} as const satisfies StoryTurnPlayed
