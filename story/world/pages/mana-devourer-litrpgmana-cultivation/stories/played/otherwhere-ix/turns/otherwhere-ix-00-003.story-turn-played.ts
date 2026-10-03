import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00003 = {
  id: "01a0ea44-11aa-7f14-a11c-ed7def32f47c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-003",
  cover: "image/image-7963bfafa4aae4cb",
  coverAfter: "Low and fast, the grass splitting ahead of it, and silent now.",
  ownLength: 194,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 3,
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/player",
  action: "I don't make any sudden movements, but turn slowly to stay facing it as it circles.",
  beats: "jsonl",
  lore: ["lore/otherwhere-ix-shardback", "place/otherwhere-ix-glassgrass-flats"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-28T15:34:00.000Z",
} as const satisfies StoryTurnPlayed
