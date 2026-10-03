import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00108 = {
  id: "01a1017d-253b-7341-9ca3-e52a696c7ae2",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-108",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 108,
  stepStatus: "step-status/game-master",
  action:
    "I eat, then hike downstream to where the Wyrm is active. When I get close, I use my lenses to scout for signs of where it is.",
  lore: ["lore/overwhere-i-wendlow-2", "place/overwhere-i-hobbs-mill-weir"],
  endsAt: "2026-10-06T09:06:00.000Z",
} as const satisfies StoryTurnPlayed
