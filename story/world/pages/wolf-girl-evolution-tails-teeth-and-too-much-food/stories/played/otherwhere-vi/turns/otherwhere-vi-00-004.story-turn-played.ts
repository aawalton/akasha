import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00004 = {
  id: "01a0ea41-3651-7d83-9cac-f7158cc9c053",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 4,
  stepStatus: "step-status/game-master",
  action:
    "I take a long drink from the running water while its next to me, then I follow the trail around the rim, hoping to find a way down below, keeping careful track of the direction the water is.",
  lore: ["place/otherwhere-vi-hollow-stream"],
  endsAt: "2026-09-28T21:30:00.000Z",
} as const satisfies StoryTurnPlayed
