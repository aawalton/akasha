import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00096 = {
  id: "01a101e3-3ef6-7aba-ab99-ba6d5bc2a8f8",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-096",
  cover: "image/image-6dbe112f43757922",
  ownLength: 265,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 96,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala"],
  stepStatus: "step-status/player",
  action:
    "I hunt the board, when I get close, I cast my ward on myself first, then find the boar and hit it in the head with my braid until it dies",
  beats: "jsonl",
  issues: [
    '"The last of its blight comes away" - the boar takes about six pulls to draw clean, not three',
    '"a plain hill boar now" - three pulls cannot clear a boar whose blight takes about six',
  ],
  lore: [
    "lore/overwhere-iii-corruption-2",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/picture",
    "story-recorder/memory",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-10T14:17:00.000Z",
  coverAfter: "It lowers its tusks at you and paws the frost.",
} as const satisfies StoryTurnPlayed
