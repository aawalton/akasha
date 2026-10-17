import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const blueBoxes00002 = {
  id: "01a14b10-e9bd-7fde-acab-395eeeee5cc9",
  type: "page-type/story-turn-played",
  slug: "blue-boxes-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/blue-boxes"],
  position: 2,
  prose: "txt",
  characters: ["character-player/blue-boxes-nala", "character-other/blue-boxes-iris"],
  stepStatus: "step-status/mechanics",
  action: "\"Uh...hi? I'm guessing I've been isekai'd, but who are you? Are you...the System?\"",
  beats: "jsonl",
  lore: [
    "lore/blue-boxes-gods-and-the-system",
    "lore/blue-boxes-levels-and-classes",
    "lore/the-dating-game-iris",
  ],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/scene",
    "story-reviewer/style",
  ],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics"],
  roleplayed: true,
  createdAt: "2026-10-17T18:12:42.045Z",
  updatedAt: "2026-10-17T18:40:13.099Z",
  ownLength: 163,
  endsAt: "2026-10-17T16:46:00.000Z",
} as const satisfies StoryTurnPlayed
