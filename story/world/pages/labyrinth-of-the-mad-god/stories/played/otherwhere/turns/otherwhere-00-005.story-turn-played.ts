import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00005 = {
  id: "01a0e9cb-c436-7e7d-996a-313ced3b05a5",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 5,
  stepStatus: "step-status/game-master",
  action: "I break the nut in half and offer half to the ape while eating the other half",
  lore: ["lore/otherwhere-cinder-isle-plants", "lore/otherwhere-copperbacks"],
} as const satisfies StoryTurnPlayed
