import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00009 = {
  id: "01a0ea08-ac0e-7e18-82e7-cb1da886c775",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-009",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 9,
  stepStatus: "step-status/game-master",
  action:
    "I hold the glass in my hand and in one last desperate rush, I circle and tackle the lizard, gripping it around the neck and trying to stab into its eye with the glass.",
  lore: [
    "lore/otherwhere-mire-monitors",
    "place/otherwhere-glassrun",
    "place/otherwhere-black-shore",
  ],
} as const satisfies StoryTurnPlayed
