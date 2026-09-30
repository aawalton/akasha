import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00050 = {
  id: "01a0f42c-cae4-7f18-b1ce-9207300ff6d7",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-050",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 50,
  stepStatus: "step-status/game-master",
  action:
    "I launch a bullet at Ghost Eye from where I am, as accurate as I can make it, but with as much power as I can give it, to see if he will approach or retreat.",
  lore: ["lore/overwhere-i-starfall-legacy", "lore/overwhere-i-the-greyfen-alpha-2"],
  endsAt: "2026-10-01T13:31:00.000Z",
} as const satisfies StoryTurnPlayed
