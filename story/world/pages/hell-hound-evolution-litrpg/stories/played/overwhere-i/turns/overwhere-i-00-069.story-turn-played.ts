import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00069 = {
  id: "01a0fd39-b9ca-7a27-95cd-f451bfe9812a",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-069",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 69,
  stepStatus: "step-status/game-master",
  action:
    "I attune Earth and Air and start hitting Voss and his men with precision bullet shots to the forehead, guiding each shot all the way to landing to ensure it hits. I keep a second air attunement ready to pull any projectiles of course so they don’t injure us.",
  lore: [
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-deserter-crew",
    "lore/overwhere-i-the-system-2",
  ],
} as const satisfies StoryTurnPlayed
