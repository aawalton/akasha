import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00013 = {
  id: "01a0f1cd-f205-7bae-b73b-70ae4c40aef5",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-013",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 13,
  stepStatus: "step-status/game-master",
  action:
    "I go to harvest the frostcaps. If the beast attacks, I put the knife through the top of its mouth. If the mana glow starts moving, I use my mana weaving to disrupt it.",
  lore: ["lore/overwhere-iii-nala", "lore/overwhere-iii-wrenmark-beasts"],
  endsAt: "2026-09-30T09:01:00.000Z",
} as const satisfies StoryTurnPlayed
