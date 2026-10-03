import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00102 = {
  id: "01a0ff47-0ee9-7f6e-9407-aa126ec2b010",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-102",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 102,
  stepStatus: "step-status/game-master",
  action:
    "“Two hour walk is all? The Wyrm sounds like a nice warm up, I’ll take that tomorrow. For today, I’m looking for a nice place to stay as well as somewhere to sell miscellaneous loot from my adventures. Oh! And someone who can turn Ghost-Eye here into a proper casting focus.” I pull out the drakewolf eye. “Recommendations?”",
  lore: ["lore/overwhere-i-wendlow-2", "place/overwhere-i-wendlow"],
} as const satisfies StoryTurnPlayed
