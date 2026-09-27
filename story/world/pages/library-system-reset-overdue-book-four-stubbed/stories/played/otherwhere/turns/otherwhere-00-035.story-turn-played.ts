import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00035 = {
  id: "01a0e53b-dcaf-707d-8af3-f255e8020d37",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-035",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 35,
  turnStatus: "turn-status/game-master",
  action:
    "“Okay, so I’m synchronized now? Does that mean I get the orientation packet? Any special powers I should know about?” I look down at my arm to see if it looks any less mangled.",
  lore: ["lore/otherwhere-universe", "place/otherwhere-main-hall", "place/otherwhere-core-chamber"],
} as const satisfies StoryTurnPlayed
