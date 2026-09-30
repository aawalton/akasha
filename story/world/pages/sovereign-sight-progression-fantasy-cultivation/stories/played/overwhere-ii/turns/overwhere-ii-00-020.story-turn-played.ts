import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00020 = {
  id: "01a0f204-4538-738e-bc57-10e7274cd55e",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-020",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 20,
  stepStatus: "step-status/game-master",
  action:
    "“I’m not sure what you’re talking about, but we can talk as we go. Goody, I’m ready for the next patient, could you lead the way? Garth, you can go home to Wren, I’ll stop by soon to see to the ewes.”",
  lore: ["lore/overwhere-ii-keeper-anselm", "lore/overwhere-ii-wendle-ford-folk"],
} as const satisfies StoryTurnPlayed
