import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00013 = {
  id: "01a0eb14-575b-77cf-86c7-2e63024b6b04",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-013",
  cover: "image/image-db961055b93869f5",
  coverAfter: "\"Pot's on the shelf. Work it in tonight, mind, or it's wasted.",
  ownLength: 176,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 13,
  prose: "txt",
  characters: [
    "character-player/otherwhere-vii-nala",
    "character-other/otherwhere-vii-joan-reeve",
    "character-other/otherwhere-vii-hild",
  ],
  stepStatus: "step-status/player",
  action:
    "\"I'm not sure I'll stay forever, but for now I would be grateful for a place to be safe, and glad to contribute what I can.\"",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/otherwhere-vii-hild",
    "lore/otherwhere-vii-joan-reeve",
    "lore/otherwhere-vii-nala",
    "place/otherwhere-vii-ashford",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-28T12:21:00.000Z",
} as const satisfies StoryTurnPlayed
