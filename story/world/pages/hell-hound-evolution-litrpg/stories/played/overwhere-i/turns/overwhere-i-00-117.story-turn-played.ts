import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00117 = {
  id: "01a103cb-b45d-7ab4-b34b-04e1c4afef2b",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-117",
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 117,
  stepStatus: "step-status/mechanics",
  action:
    "I spend the time I have before I need to leave using the weave i found to finish mending my cloak and clothes, then go to see the magistrate.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-i-odile-varne",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-starfall-legacy-3",
    "lore/overwhere-i-wendlow-2",
    "lore/overwhere-i-wendlow-3",
    "place/overwhere-i-wendlow",
  ],
  recordedBy: ["story-recorder/mechanics", "story-recorder/inventory"],
  endsAt: "2026-10-07T12:15:00.000Z",
} as const satisfies StoryTurnPlayed
