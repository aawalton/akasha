import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00078 = {
  id: "01a0fef3-cba1-77d6-98a9-be3bfae9cc94",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-078",
  cover: "image/image-31ea57b160d32331",
  ownLength: 104,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 78,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-marda-hesk"],
  stepStatus: "step-status/player",
  action:
    "“I didn’t either, good to know. Could I buy glimmershards? How much do they run? I’m one short of appraise.”",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-marda-hesk-2",
    "lore/overwhere-iii-mending-weave",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
    "place/overwhere-iii-crook-and-candle",
    "place/overwhere-iii-merrowgate",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-07T16:11:00.000Z",
  coverAfter: "Five glimmerstones.",
} as const satisfies StoryTurnPlayed
