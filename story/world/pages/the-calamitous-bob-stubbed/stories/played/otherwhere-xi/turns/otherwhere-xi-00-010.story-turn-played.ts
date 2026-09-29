import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereXi00010 = {
  id: "01a0eb2c-8f4c-7891-8ca6-9349db92cca1",
  type: "page-type/story-turn-played",
  slug: "otherwhere-xi-00-010",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-xi"],
  position: 10,
  stepStatus: "step-status/game-master",
  action:
    "I do my best to follow instructions and save the lamb and the ewe, praying in my heart for a healer path as a sign for why I was brought to this land.",
  lore: ["lore/otherwhere-xi-wenna-ashlar", "place/otherwhere-xi-ashlar-farm"],
  endsAt: "2026-09-28T09:34:00.000Z",
} as const satisfies StoryTurnPlayed
