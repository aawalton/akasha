import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00006 = {
  id: "01a0f153-f4c9-720d-a6ba-324cc32d59cc",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 6,
  stepStatus: "step-status/game-master",
  action:
    "I check my status and see that the armor cost only one point from my reserve. “All right! Seems like I’ll need to practice holding spells.” I activate the Earth armor again and this time focus on holding it for as long as I can, then add in the Wind movement boost and practice moving around in the armor, then add a third new spell, a rapidly rotating thin sword made of water. I try to hold all three at once and monitor my status, dropping them if I hit half on any of the reserves.",
  lore: ["lore/overwhere-i-nala", "place/overwhere-i-greyfen-ford"],
} as const satisfies StoryTurnPlayed
