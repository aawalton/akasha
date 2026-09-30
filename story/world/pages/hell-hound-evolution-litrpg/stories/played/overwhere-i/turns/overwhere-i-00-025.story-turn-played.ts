import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00025 = {
  id: "01a0f24e-f3ef-769a-b6de-659c9856e093",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-025",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 25,
  stepStatus: "step-status/game-master",
  action:
    "“You’re welcome to the hide and meat for free if you can find it. I killed him in the swamp and he sank in deep. Barely managed to get the tusks out of the muck. If you manage it, it’s yours. I’m taking a bath!”",
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-garrick-pell",
    "place/overwhere-i-fenwatch",
  ],
  endsAt: "2026-09-30T09:09:00.000Z",
} as const satisfies StoryTurnPlayed
