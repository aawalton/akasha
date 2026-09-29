import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00015 = {
  id: "01a0eb1e-9f9a-7154-b130-3089a2357364",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-015",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 15,
  stepStatus: "step-status/game-master",
  action:
    '"Yes, I made it through a night in the forest alone. I know enough to fear the dark, but I can be afraid without panic."',
  lore: ["lore/otherwhere-vi-nala", "place/otherwhere-vi-charcoal-camp"],
} as const satisfies StoryTurnPlayed
