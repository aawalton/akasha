import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00002 = {
  id: "01a0ea30-9a91-7452-bc27-1cbc34f66ca0",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 2,
  stepStatus: "step-status/game-master",
  action:
    '"Hello?" I say confidently, then I stand up tall and put my arms on my hips to make me look bigger. "Can you understand me?"',
  lore: ["lore/otherwhere-ix-shardback", "place/otherwhere-ix-glassgrass-flats"],
  endsAt: "2026-09-28T15:32:00.000Z",
} as const satisfies StoryTurnPlayed
