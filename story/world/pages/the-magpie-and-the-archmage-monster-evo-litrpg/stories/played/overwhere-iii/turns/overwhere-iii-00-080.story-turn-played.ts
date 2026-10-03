import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00080 = {
  id: "01a0ff17-d3fa-707b-b1c0-ac5d49005dc7",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-080",
  cover: "image/image-05fd09db6ed4073b",
  ownLength: 225,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 80,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-marda-hesk"],
  stepStatus: "step-status/player",
  action:
    "“Yeah, definitely the small one first, that’s the deer?” I follow the directions and hit it with my cleansing current lash braid as soon as I can reach it.",
  beats: "jsonl",
  issues: ['"It comes in one long draw" - lore says two pulls draw the deer\'s blight'],
  lore: [
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-corruption-2",
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-marda-hesk-2",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
    "place/overwhere-iii-wrenwood",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-08T12:30:00.000Z",
  coverAfter:
    "Then you see the prints. Wolf prints circle the deer, bigger than any Wrenwood wolf's.",
} as const satisfies StoryTurnPlayed
