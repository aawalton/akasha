import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00064 = {
  id: "01a0fd05-5818-703f-9768-c4e89621c76c",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-064",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 64,
  stepStatus: "step-status/game-master",
  action: "I go with Rowan and Sedge to get the head, keeping an eye out for any more dangers.",
  lore: [
    "lore/overwhere-i-greyfen-beasts-2",
    "lore/overwhere-i-rowan-coalby",
    "lore/overwhere-i-the-greyfen-alpha-2",
    "lore/overwhere-i-the-greyfen-alpha-2-2",
    "place/overwhere-i-the-greyfen",
  ],
} as const satisfies StoryTurnPlayed
