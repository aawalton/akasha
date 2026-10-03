import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00017 = {
  id: "01a0eb2f-59ce-77df-b24b-222d27eae59f",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-017",
  cover: "image/image-ec8eec91ed9ce395",
  coverAfter: "Beneath the leaves, all along the stem, are clusters of tiny black",
  ownLength: 394,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 17,
  prose: "txt",
  characters: [
    "character-player/otherwhere-iv-nala",
    "character-other/otherwhere-iv-tie-bo",
    "character-other/otherwhere-iv-granny-hua",
  ],
  stepStatus: "step-status/player",
  action: "I do as instructed.",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/otherwhere-iv-fang-brothers",
    "lore/otherwhere-iv-granny-hua",
    "lore/otherwhere-iv-nala",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-29T06:37:00.000Z",
} as const satisfies StoryTurnPlayed
