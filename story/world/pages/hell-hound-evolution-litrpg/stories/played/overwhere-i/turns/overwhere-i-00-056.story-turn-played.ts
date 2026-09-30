import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00056 = {
  id: "01a0f46b-59d4-79b4-999c-c54252fb8b5e",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-056",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 56,
  stepStatus: "step-status/game-master",
  action:
    "I bring them with me and journey back to the village for a well-deserved bath, meal, and rest.",
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-fenwatch-2",
    "lore/overwhere-i-garrick-pell",
    "lore/overwhere-i-osric-fenn",
    "lore/overwhere-i-rowan-coalby",
    "lore/overwhere-i-the-greyfen-alpha-2",
    "place/overwhere-i-fenwatch",
  ],
  endsAt: "2026-10-01T16:30:00.000Z",
} as const satisfies StoryTurnPlayed
