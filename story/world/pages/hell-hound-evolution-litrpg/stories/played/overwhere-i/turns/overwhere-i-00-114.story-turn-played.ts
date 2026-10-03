import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00114 = {
  id: "01a101ce-21f1-7370-816e-5624f1a6de9c",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-114",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 114,
  stepStatus: "step-status/game-master",
  action: "I hand it over, then travel back to town and turn in the fangs for the bounty",
  lore: [
    "lore/overwhere-i-hobbs-mill-weir-2",
    "lore/overwhere-i-wendlow-2",
    "lore/overwhere-i-wendlow-2-2",
  ],
  endsAt: "2026-10-06T14:37:00.000Z",
} as const satisfies StoryTurnPlayed
