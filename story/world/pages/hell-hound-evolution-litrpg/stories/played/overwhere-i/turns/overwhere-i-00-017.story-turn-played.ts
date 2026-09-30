import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00017 = {
  id: "01a0f1cb-572d-704b-b62e-d0f5a1d3a925",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-017",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 17,
  stepStatus: "step-status/game-master",
  action:
    "I go and enjoy the party and chat casually with people, listening and absorbing what they say, but not sharing much about myself.",
  lore: [
    "lore/overwhere-i-agathe-morrow",
    "lore/overwhere-i-garrick-pell",
    "lore/overwhere-i-hessa-vane",
    "lore/overwhere-i-rowan-coalby",
    "lore/overwhere-i-the-greyfen-alpha",
    "lore/overwhere-i-tobin-ashdown",
    "lore/overwhere-i-wenna-thorne",
    "place/overwhere-i-fenwatch",
    "place/overwhere-i-the-greyfen",
  ],
  endsAt: "2026-09-29T21:20:00.000Z",
} as const satisfies StoryTurnPlayed
