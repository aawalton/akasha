import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00012 = {
  id: "01a0eb16-faae-7d72-86ff-451193a58de4",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-012",
  cover: "image/image-7c5012e43d7d85dc",
  coverAfter: "The blood has already gone thick. It barely comes, a slow dark",
  ownLength: 189,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 12,
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/player",
  action:
    "I test my durability against the glass to see if it still cuts my skin, then I do my best to drink the blood of the beast for water and nourishment.",
  beats: "jsonl",
  lore: ["lore/otherwhere-ix-nala", "lore/otherwhere-ix-shardback", "lore/otherwhere-ix-survival"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-28T15:50:00.000Z",
} as const satisfies StoryTurnPlayed
