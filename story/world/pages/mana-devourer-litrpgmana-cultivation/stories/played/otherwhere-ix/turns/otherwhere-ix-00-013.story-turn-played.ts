import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00013 = {
  id: "01a0eb29-99be-72ee-a56e-f56c50899566",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-013",
  cover: "image/image-bd9c7ec4e090a1a1",
  coverAfter: "Something low and broad is coming through it, straight toward the kill,",
  ownLength: 237,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 13,
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/player",
  action:
    "I check the quills of the beast I killed, to see if I can use them as weapons more safely than the grass.",
  beats: "jsonl",
  lore: ["lore/otherwhere-ix-nala", "lore/otherwhere-ix-shardback"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: ["story-recorder/memory", "story-recorder/mechanics", "story-recorder/picture"],
  endsAt: "2026-09-28T15:55:00.000Z",
} as const satisfies StoryTurnPlayed
