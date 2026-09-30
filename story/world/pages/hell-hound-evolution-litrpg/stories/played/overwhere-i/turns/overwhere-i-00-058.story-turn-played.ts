import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00058 = {
  id: "01a0f47d-cc5c-7cee-b434-1e89d1765849",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-058",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 58,
  stepStatus: "step-status/game-master",
  action:
    "“Oh drat. I left it on the island. If you come back with me to get it, I’ll cut you in for a gold. That thing looked annoyingly heavy.”",
  lore: [
    "lore/overwhere-i-rowan-coalby",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-greyfen-alpha-2",
    "place/overwhere-i-the-greyfen",
  ],
  endsAt: "2026-10-01T16:35:00.000Z",
} as const satisfies StoryTurnPlayed
