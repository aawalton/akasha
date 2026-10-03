import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00104 = {
  id: "01a10182-2044-7a29-91a1-01909d0888b1",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-104",
  cover: "image/image-0ef98a99dbd11f35",
  ownLength: 161,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 104,
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  action: "“One step at a time. Help me build a dam across the channel. Keep the run-off back.”",
  beats: "jsonl",
  lore: [
    "lore/overwhere-ii-nala",
    "lore/overwhere-ii-nala-2",
    "lore/overwhere-ii-nala-3",
    "place/overwhere-ii-whitecombs",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-26T11:05:00.000Z",
  coverAfter: "Hawise wipes her hands and looks out at the steaming black.",
} as const satisfies StoryTurnPlayed
