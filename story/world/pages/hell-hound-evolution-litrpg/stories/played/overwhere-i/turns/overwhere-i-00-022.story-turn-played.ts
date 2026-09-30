import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00022 = {
  id: "01a0f20c-3225-731c-a8a6-6f3c9b2d2f8d",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-022",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 22,
  stepStatus: "step-status/game-master",
  action:
    "I switch to a thin spinning disk of water and use it as a saw blade to cut off just the head, then haul that back to the village.",
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-greyfen-beasts",
    "lore/overwhere-i-nala",
    "lore/overwhere-i-starfall-legacy",
    "place/overwhere-i-fenwatch",
  ],
  endsAt: "2026-09-30T07:57:00.000Z",
} as const satisfies StoryTurnPlayed
