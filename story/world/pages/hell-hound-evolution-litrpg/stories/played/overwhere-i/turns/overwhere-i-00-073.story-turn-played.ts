import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00073 = {
  id: "01a0fd6f-a437-726f-b109-d435e2555ada",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-073",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 73,
  stepStatus: "step-status/game-master",
  action:
    "Now that I can see him, I focus Earth and Fire on his helmet directly, and if he takes it off, I put a bullet in his brain.",
  lore: [
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-deserter-crew-2",
  ],
} as const satisfies StoryTurnPlayed
