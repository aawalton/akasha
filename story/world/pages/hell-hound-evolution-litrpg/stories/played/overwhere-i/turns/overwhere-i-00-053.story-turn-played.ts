import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00053 = {
  id: "01a0f44f-12af-7aa3-83db-225eeb0675b0",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-053",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 53,
  stepStatus: "step-status/game-master",
  action:
    "Now that it’s dead, I try using a combination of water and earth to pluck its ghost eye from its skull and add it to my pack along with its ears, then continue through the island, finishing off any remaining wolves I find on my way back to the village.",
  lore: [
    "lore/overwhere-i-rowan-coalby",
    "lore/overwhere-i-the-greyfen-alpha-2",
    "place/overwhere-i-the-greyfen",
  ],
  endsAt: "2026-10-01T13:52:00.000Z",
} as const satisfies StoryTurnPlayed
