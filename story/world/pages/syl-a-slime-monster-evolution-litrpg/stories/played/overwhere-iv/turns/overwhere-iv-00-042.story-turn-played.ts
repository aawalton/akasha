import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00042 = {
  id: "01a0f466-a656-7e12-96ab-989fe00a80de",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-042",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 42,
  stepStatus: "step-status/game-master",
  action:
    "“Axe is no good. Skill is specialized for spears.” I make a show of moving the spear along with the slice to make the desired cuts, then head back to the guild hall.",
  lore: ["lore/overwhere-iv-ilsa-crane-2", "lore/overwhere-iv-nala", "lore/overwhere-iv-nala-2"],
} as const satisfies StoryTurnPlayed
