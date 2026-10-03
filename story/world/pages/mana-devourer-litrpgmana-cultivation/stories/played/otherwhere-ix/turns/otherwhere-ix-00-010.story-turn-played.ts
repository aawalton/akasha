import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00010 = {
  id: "01a0eabb-2aee-73ff-a002-2c74688fc413",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-010",
  cover: "image/image-5da1d2ae39c6677f",
  coverAfter: "Under you, the dead beast's blood is soaking into the tights at",
  ownLength: 211,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 10,
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/player",
  action:
    "I keep pushing until it dies. \"System? Status? Now would be a great time for a level up or some kind of regeneration talent. I feel like I've gotten a raw deal here. If I die now, I'll be complaining to Death about whoever brought me here.\"",
  beats: "jsonl",
  lore: [
    "lore/otherwhere-ix-nala",
    "lore/otherwhere-ix-shardback",
    "lore/otherwhere-ix-stat-points",
    "lore/otherwhere-ix-status",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-28T15:43:00.000Z",
} as const satisfies StoryTurnPlayed
