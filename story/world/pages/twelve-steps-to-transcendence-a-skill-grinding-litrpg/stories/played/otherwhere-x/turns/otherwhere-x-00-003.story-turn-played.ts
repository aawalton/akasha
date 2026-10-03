import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereX00003 = {
  id: "01a0ea8d-4e45-721e-9193-dae99fad9e35",
  type: "page-type/story-turn-played",
  slug: "otherwhere-x-00-003",
  cover: "image/image-1dc796e2082dbf32",
  coverAfter: "The door opens. A lean man of about fifty, grey at the",
  ownLength: 435,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-x"],
  position: 3,
  prose: "txt",
  characters: ["character-player/otherwhere-x-nala"],
  stepStatus: "step-status/player",
  action: '"Hi there, would you mind pointing me in the direction of your parents?"',
  beats: "jsonl",
  lore: ["place/otherwhere-x-harrow"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-28T18:27:00.000Z",
} as const satisfies StoryTurnPlayed
