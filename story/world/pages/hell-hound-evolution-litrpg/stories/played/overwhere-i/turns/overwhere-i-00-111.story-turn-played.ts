import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00111 = {
  id: "01a101a5-efc2-72f8-ab6b-4bd6a8412217",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-111",
  cover: "image/image-2cae1ddf1132529f",
  ownLength: 264,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 111,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  action:
    "I double channel earth, pulling the stone ledge into sharp spikes piercing into its soft flesh underneath, angled to keep it on the ledge, then fire again at the head",
  beats: "jsonl",
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-starfall-legacy-2",
    "place/overwhere-i-hobbs-mill-weir",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-06T11:37:00.000Z",
  coverAfter: "Your sight clears in patches, then all at once. You raise your palm,",
} as const satisfies StoryTurnPlayed
