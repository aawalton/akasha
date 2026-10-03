import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00112 = {
  id: "01a101b5-d11d-71ec-9d1d-1955223a7049",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-112",
  cover: "image/image-f25f71f22969b8f2",
  ownLength: 482,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 112,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action:
    "I carefully go over to it, staying out of biting range, then use my spinning water disk to remove the head and carefully disect the beast for the bile sac, which I store in the jar",
  beats: "jsonl",
  lore: [
    "lore/overwhere-i-hobbs-mill-weir-2",
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "place/overwhere-i-hobbs-mill-weir",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/memory",
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-06T12:02:00.000Z",
  coverAfter: "In the gut beside where the sac lay, something catches the light. You",
} as const satisfies StoryTurnPlayed
