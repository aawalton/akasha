import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00110 = {
  id: "01a10197-3c2a-7652-ad7d-3a727951f5fb",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-110",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 110,
  stepStatus: "step-status/game-master",
  action:
    "I go and hide myself 20 yards from where it suns, then wait for it to appear. When it settles, I focus on the electricity element I haven’t used much and do a dual summon above it, hitting it with a targeting double lightning strike in the head. Then I try my double fire eye beams and try to burn through its skull.",
  lore: [
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "place/overwhere-i-hobbs-mill-weir",
  ],
  endsAt: "2026-10-06T11:36:00.000Z",
} as const satisfies StoryTurnPlayed
