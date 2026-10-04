import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00117 = {
  id: "01a103cb-b45d-7ab4-b34b-04e1c4afef2b",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-117",
  cover: "image/image-a76a144d0a30081e",
  ownLength: 512,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 117,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala", "character-other/overwhere-i-harl-voss"],
  stepStatus: "step-status/recorders",
  action:
    "I spend the time I have before I need to leave using the weave i found to finish mending my cloak and clothes, then go to see the magistrate.",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-odile-varne",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "lore/overwhere-i-starfall-legacy-3",
    "lore/overwhere-i-wendlow-2",
    "lore/overwhere-i-wendlow-3",
    "place/overwhere-i-wendlow",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/scene"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/plan",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-07T12:15:00.000Z",
  coverAfter: "Odile Varne, Magistrate of Wendlow, looks you over from boots to hood",
} as const satisfies StoryTurnPlayed
