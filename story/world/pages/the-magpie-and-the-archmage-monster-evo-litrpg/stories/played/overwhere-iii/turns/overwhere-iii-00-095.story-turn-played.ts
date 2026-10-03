import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00095 = {
  id: "01a101d3-88b7-79ff-b68a-c1ae0246aa91",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-095",
  cover: "image/image-227a45ea59307823",
  ownLength: 240,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 95,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-brannagh-tull",
    "character-other/overwhere-iii-tam-rowe",
  ],
  stepStatus: "step-status/player",
  action:
    "“That will be useful.” I walk back to town, dinner and bed, then check in and heal any patients, training with the guard, lunch, then hunting for blighted beasts again.",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-brannagh-tull-3",
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
  endsAt: "2026-10-10T13:00:00.000Z",
  coverAfter: "The watch whoops. Tam lies there laughing at the sky.",
} as const satisfies StoryTurnPlayed
