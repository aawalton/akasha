import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00073 = {
  id: "01a0fe89-76b1-7564-bd6e-116532df2ba9",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-073",
  cover: "image/image-a7e8e4a9a562bd43",
  ownLength: 217,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 73,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-marda-hesk"],
  stepStatus: "step-status/player",
  action:
    "“Yeah, I’ll rest before going out again and work on the rest.” I walk out to the shrine and then practice using the gold currents directly to cleanse the blightstones, instead of my own mana.",
  beats: "jsonl",
  issues: [
    '"The raw current scorches your palms" - a slip at feeding from current costs only the try',
  ],
  lore: [
    "lore/overwhere-iii-braid-weaving",
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-current-feed",
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
    "place/overwhere-iii-wrenwood-crossroads",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-07T14:30:00.000Z",
  coverAfter: "You sweep the specks together. With the fox stone's three, that's ten.",
} as const satisfies StoryTurnPlayed
