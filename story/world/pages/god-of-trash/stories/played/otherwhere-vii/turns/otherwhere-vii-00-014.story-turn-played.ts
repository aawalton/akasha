import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00014 = {
  id: "01a0eb58-96c5-70a3-8d31-3dc06e518b3a",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-014",
  cover: "image/image-602508bfdce472a2",
  coverAfter: "Hild looks you over once more, from the clogs up to the",
  ownLength: 115,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 14,
  prose: "txt",
  characters: [
    "character-player/otherwhere-vii-nala",
    "character-other/otherwhere-vii-hild",
    "character-other/otherwhere-vii-joan-reeve",
  ],
  stepStatus: "step-status/player",
  action: "“Anything you need from me before morning?”",
  beats: "jsonl",
  lore: ["lore/otherwhere-vii-hild", "lore/otherwhere-vii-joan-reeve", "lore/otherwhere-vii-nala"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-28T12:23:00.000Z",
} as const satisfies StoryTurnPlayed
