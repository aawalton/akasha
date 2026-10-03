import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00014 = {
  id: "01a0eac9-1c35-77a0-bd71-99b01667a561",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-014",
  cover: "image/image-b57e2592d4205ca0",
  coverAfter: '"A white stag lived on the mountain, and three hunters went up',
  ownLength: 744,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 14,
  prose: "txt",
  characters: ["character-player/otherwhere-iv-nala", "character-other/otherwhere-iv-zhao-jun"],
  stepStatus: "step-status/player",
  action:
    '"I will come if you ask, though I fear I may be more hindrance than help. By your description, I think you have your answer. If this boar has reached a size unnatural for its kind, it must have ascended to a different kind. If it is the same boar that killed your brother, all the more reason it must be brought down. However, are there preparations we could make to make the hunt safer? What of poison? If we know where it will forage, could we use that to weaken it? What of a pit trap with sharpened stakes at the bottom? Its weight would surely cause it to fall through a light cover and may make it harder for it to get back out. Could we combine that with fire in the pit and suffocate it in the smoke?"',
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/otherwhere-iv-boar-hunt",
    "lore/otherwhere-iv-earth-god-shrine",
    "lore/otherwhere-iv-nala",
    "lore/otherwhere-iv-spirit-beast-tales",
    "lore/otherwhere-iv-three-stones-folk",
    "lore/otherwhere-iv-tie-bo",
    "place/otherwhere-iv-upstream-woods",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-28T19:46:00.000Z",
} as const satisfies StoryTurnPlayed
