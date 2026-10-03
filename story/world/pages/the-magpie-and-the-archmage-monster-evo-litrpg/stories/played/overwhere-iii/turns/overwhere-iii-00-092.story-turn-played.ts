import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00092 = {
  id: "01a101a8-25cb-739f-b3b8-34b4ac784ff1",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-092",
  cover: "image/image-cc8dbc54b4987ced",
  ownLength: 133,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 92,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-marda-hesk"],
  stepStatus: "step-status/player",
  action:
    "I thread my braided lash down into the burrow to finish it off, then reach in and pull it out, collecting the blightstones, then return to the Post for the bounties.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iii-corruption-2",
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-marda-hesk-2",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-09T13:45:00.000Z",
  coverAfter: "She dips her pen to mark the ledger, then pauses.",
} as const satisfies StoryTurnPlayed
