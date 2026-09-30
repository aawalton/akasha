import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00010 = {
  id: "01a0f17c-4913-7771-aa3f-95b301089e38",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-010",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 10,
  stepStatus: "step-status/game-master",
  action:
    "“Oh, that little thing? That was me. Thought it might be tasty. If you’ll help with transport, I’d be happy to contribute it for a feast.”",
  lore: [
    "lore/overwhere-i-hessa-vane",
    "lore/overwhere-i-sootjaw",
    "lore/overwhere-i-tobin-ashdown",
    "place/overwhere-i-fenwatch",
    "place/overwhere-i-greyfen-ford",
  ],
  endsAt: "2026-09-29T11:12:00.000Z",
} as const satisfies StoryTurnPlayed
