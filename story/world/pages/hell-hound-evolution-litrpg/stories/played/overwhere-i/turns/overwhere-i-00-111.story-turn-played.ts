import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00111 = {
  id: "01a101a5-efc2-72f8-ab6b-4bd6a8412217",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-111",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 111,
  stepStatus: "step-status/game-master",
  action:
    "I double channel earth, pulling the stone ledge into sharp spikes piercing into its soft flesh underneath, angled to keep it on the ledge, then fire again at the head",
  lore: [
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "place/overwhere-i-hobbs-mill-weir",
  ],
} as const satisfies StoryTurnPlayed
