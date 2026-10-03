import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00007 = {
  id: "01a0ea8a-9a5c-774e-980c-a31905500d44",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-007",
  cover: "image/image-349d284a60f56ea9",
  coverAfter: "The wound is shallow. Blood runs from it, but the beast is",
  ownLength: 167,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 7,
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/player",
  action:
    "\"Firrelia System, if you have a unique trait waiting for me, now is the time, otherwise you'll have lost your chance.\" I grab at the glass and try to stab it into the beast's throat.",
  beats: "jsonl",
  lore: ["lore/otherwhere-ix-shardback", "lore/otherwhere-ix-nala"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-28T15:38:00.000Z",
} as const satisfies StoryTurnPlayed
