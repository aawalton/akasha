import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00121 = {
  id: "01a10715-0eb4-7d64-b4dd-927905cd98bb",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-121",
  ownLength: 334,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 121,
  prose: "txt",
  characters: [
    "character-player/overwhere-i-nala",
    "character-other/overwhere-i-harl-voss",
    "character-other/overwhere-i-voss-drakewolf",
  ],
  stepStatus: "step-status/recorders",
  action:
    "“Sure, that sounds fine. What’s on the East road that needs killing again? So I’m not going in blind.”",
  beats: "jsonl",
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-odile-varne",
    "lore/overwhere-i-the-deserter-crew",
    "lore/overwhere-i-the-deserter-crew-2",
    "lore/overwhere-i-the-deserter-crew-3",
    "lore/overwhere-i-the-deserter-crew-4",
  ],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/plan",
    "story-recorder/mechanics",
    "story-recorder/memory",
  ],
  endsAt: "2026-10-07T12:48:00.000Z",
} as const satisfies StoryTurnPlayed
