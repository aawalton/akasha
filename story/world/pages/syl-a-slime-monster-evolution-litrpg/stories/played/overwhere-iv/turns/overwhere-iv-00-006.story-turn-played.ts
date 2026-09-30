import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00006 = {
  id: "01a0f194-6c1e-7d63-866f-0ba789d60862",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 6,
  stepStatus: "step-status/game-master",
  action:
    "“Thank you for the ride, Garrett, I’m sure I’ll see you around for a while.” Then I go back to the guard house to sign up for drills and see if I can bunk there for the night.",
  lore: [
    "lore/overwhere-iv-brenna-holt",
    "lore/overwhere-iv-rennick-hale",
    "place/overwhere-iv-millbrook-gatehouse",
  ],
} as const satisfies StoryTurnPlayed
