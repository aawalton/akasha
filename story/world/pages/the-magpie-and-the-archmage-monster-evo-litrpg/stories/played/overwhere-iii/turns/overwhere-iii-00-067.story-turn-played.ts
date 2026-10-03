import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00067 = {
  id: "01a0fe42-8f77-71a5-9f94-fbabe30798fb",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-067",
  cover: "image/image-d7a3ce42266c33b5",
  ownLength: 164,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 67,
  prose: "txt",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-brannagh-tull",
  ],
  stepStatus: "step-status/player",
  action: "I rest and watch the weaves until dusk, then heal the washer woman",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iii-braid-weaving",
    "lore/overwhere-iii-brannagh-tull",
    "lore/overwhere-iii-brannagh-tull-2",
    "lore/overwhere-iii-mending-weave",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-06T18:15:00.000Z",
  coverAfter: "You lay your palm on it. The first Mending Weave sinks in deep",
} as const satisfies StoryTurnPlayed
