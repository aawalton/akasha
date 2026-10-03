import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00109 = {
  id: "01a1018b-3634-7b9d-92a4-816cda8fd7dc",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-109",
  cover: "image/image-5b47b937ce357fe7",
  ownLength: 280,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 109,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action: "I go over to hear what he has to say",
  beats: "jsonl",
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "place/overwhere-i-hobbs-mill-weir"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-06T09:16:00.000Z",
  coverAfter: "Jory squints up at the sun climbing over the weir, already warm on the stone.",
} as const satisfies StoryTurnPlayed
