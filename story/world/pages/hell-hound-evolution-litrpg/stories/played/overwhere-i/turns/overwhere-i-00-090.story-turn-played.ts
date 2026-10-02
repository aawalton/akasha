import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00090 = {
  id: "01a0fe8d-1485-7c6e-a76e-8bdad23356a7",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-090",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 90,
  stepStatus: "step-status/game-master",
  action:
    "I apply the salve. “I forget how many, we can count ears and tags if you want. For Voss, I’ve got his head in his sack here.” I open the sack and pull it out so they can see. “Guess we have two bounties to turn in now.”",
  lore: [
    "lore/overwhere-i-osric-fenn",
    "lore/overwhere-i-the-system-2",
    "lore/overwhere-i-tobin-ashdown",
    "place/overwhere-i-wendlow",
  ],
} as const satisfies StoryTurnPlayed
