import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00008 = {
  id: "01a0e9fd-ea3e-752d-9a90-d55f1a2c6364",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-008",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 8,
  stepStatus: "step-status/game-master",
  action:
    "“Okay, isekai protocol. System? Status? Character sheet? If you left me here with truly nothing, I might as well fucking die now, and then I won’t be any entertainment for anyone.”",
  lore: ["lore/otherwhere-interface", "lore/otherwhere-mire-monitors"],
} as const satisfies StoryTurnPlayed
