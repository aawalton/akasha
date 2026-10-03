import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00101 = {
  id: "01a0ff82-544d-7679-8537-50858892db22",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-101",
  cover: "image/image-5476838f2f325b60",
  ownLength: 215,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 101,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action:
    "“Get down with your boys, Hawise and I will handle this, but thank you for the suggestion. Hawise, can you build a bank while I hold back the black?”",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "place/overwhere-ii-callow-beck",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-25T18:30:00.000Z",
  coverAfter: "The black water leans against the bank. The bank holds.",
} as const satisfies StoryTurnPlayed
