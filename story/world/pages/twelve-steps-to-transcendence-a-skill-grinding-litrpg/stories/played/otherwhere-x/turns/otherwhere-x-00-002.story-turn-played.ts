import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereX00002 = {
  id: "01a0ea79-9cbf-77c6-ad59-4c63769617da",
  type: "page-type/story-turn-played",
  slug: "otherwhere-x-00-002",
  cover: "image/image-7c82a216f92528cd",
  coverAfter: "On the far side, below you, is a village. Thatched roofs around",
  ownLength: 476,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-x"],
  position: 2,
  prose: "txt",
  characters: ["character-player/otherwhere-x-nala"],
  stepStatus: "step-status/player",
  action: "I walk towards the wood smoke, since that seems closer, to see who I can find.",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "place/otherwhere-x-harrow",
    "place/otherwhere-x-harrow-mile",
    "place/otherwhere-x-harrow-vale",
    "place/otherwhere-x-sulon",
    "lore/otherwhere-x-language",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/picture", "story-recorder/memory"],
  endsAt: "2026-09-28T18:02:00.000Z",
} as const satisfies StoryTurnPlayed
