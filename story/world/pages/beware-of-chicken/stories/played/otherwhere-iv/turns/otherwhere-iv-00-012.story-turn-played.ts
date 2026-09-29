import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00012 = {
  id: "01a0eaa4-0862-7a0e-b803-b8ca07e1e46f",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-012",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 12,
  stepStatus: "step-status/game-master",
  action:
    "\"You two look like just kind of strong lads who would do well on a hunt, but I'm afraid that's not up to me. You'll need to talk with Headman Gu and Zhao Jun about that. I have great knowledge, but when it comes to the hunt itself, Headman Gu is more mighty than I.\"",
  lore: ["lore/otherwhere-iv-gu-household"],
} as const satisfies StoryTurnPlayed
