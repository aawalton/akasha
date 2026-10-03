import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereI00064 = {
  id: "01a0e817-d248-7ff8-ab6f-f1b874b2a9d7",
  type: "page-type/story-turn-played",
  slug: "otherwhere-i-00-064",
  cover: "image/image-bcad9d972511466f",
  coverAfter: "Overhead, the hall's gold light begins to sink toward evening amber.",
  ownLength: 197,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-i"],
  position: 64,
  prose: "txt",
  characters: ["character-player/otherwhere-i-alan", "character-other/otherwhere-i-links"],
  stepStatus: "step-status/player",
  action:
    "**Okay, I'm not comfortable opening to patrons with this many books on the floor. I'll keep working on that and we'll open when at least these shelves are clean. Let me know if I find more books to speed up the process.** I continue working through the piles through the afternoon.",
  beats: "jsonl",
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-28T18:00:00.000Z",
} as const satisfies StoryTurnPlayed
