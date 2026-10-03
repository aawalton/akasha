import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00002 = {
  id: "01a0ea30-9a91-7452-bc27-1cbc34f66ca0",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-002",
  cover: "image/image-fb0baac8d9c58e8d",
  coverAfter: "It is low and broad, about as high as your knee, with",
  ownLength: 302,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 2,
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/player",
  action:
    '"Hello?" I say confidently, then I stand up tall and put my arms on my hips to make me look bigger. "Can you understand me?"',
  beats: "jsonl",
  issues: "txt",
  lore: ["lore/otherwhere-ix-shardback", "place/otherwhere-ix-glassgrass-flats"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-28T15:32:00.000Z",
} as const satisfies StoryTurnPlayed
