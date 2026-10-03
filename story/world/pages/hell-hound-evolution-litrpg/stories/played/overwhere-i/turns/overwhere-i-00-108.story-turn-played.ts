import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00108 = {
  id: "01a1017d-253b-7341-9ca3-e52a696c7ae2",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-108",
  cover: "image/image-ca428f1809b1c5cb",
  ownLength: 465,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 108,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action:
    "I eat, then hike downstream to where the Wyrm is active. When I get close, I use my lenses to scout for signs of where it is.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-wendlow-2",
    "place/overwhere-i-hobbs-mill-weir",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-06T09:06:00.000Z",
  coverAfter: "You draw two lenses of water out of the air and set them in",
} as const satisfies StoryTurnPlayed
