import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00083 = {
  id: "01a0fe29-b768-7148-bc01-fe7d956b271b",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-083",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 83,
  stepStatus: "step-status/game-master",
  action:
    "30 yards is in range. I focus two separate beams of fire, one from each hand, and have then intersect at each target, focusing each man in turn until they drop.",
  lore: [
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-deserter-crew-2",
    "lore/overwhere-i-the-deserter-crew-2-2",
  ],
  endsAt: "2026-10-03T17:05:00.000Z",
} as const satisfies StoryTurnPlayed
