import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00080 = {
  id: "01a0fdc5-a997-7d91-8d85-5e4034ec9bd1",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-080",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 80,
  stepStatus: "step-status/game-master",
  action:
    "I start chasing them at full enhanced speed. When I get in crossbow range, I put on my air ward to deflect bolts. When I get in beam range, I use my fire beam again.",
  lore: [
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-deserter-crew-2",
    "lore/overwhere-i-the-deserter-crew-2-2",
  ],
  endsAt: "2026-10-03T16:18:00.000Z",
} as const satisfies StoryTurnPlayed
