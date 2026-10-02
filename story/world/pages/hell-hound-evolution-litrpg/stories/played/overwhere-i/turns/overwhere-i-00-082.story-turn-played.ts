import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00082 = {
  id: "01a0fde2-59b9-7e3d-a6a5-0a8c3566251b",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-082",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 82,
  stepStatus: "step-status/game-master",
  action:
    "I take a blade from one of the downed men and stab both through the neck to make sure they are fully down, then quietly fall back a bit and start quietly circling, giving my mana some time to recharge.",
  lore: [
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-the-deserter-crew-2",
    "lore/overwhere-i-the-deserter-crew-2-2",
  ],
} as const satisfies StoryTurnPlayed
