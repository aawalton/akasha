import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00069 = {
  id: "01a0fe5a-7a7c-7d2f-910a-d19c6e6e0fea",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-069",
  cover: "image/image-cd2e7cb163d059e9",
  ownLength: 161,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 69,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-marda-hesk"],
  stepStatus: "step-status/player",
  action:
    "I go back to the post and work on cleansing blightstones, experimenting with ways to do it more efficiently",
  beats: "jsonl",
  issues: [
    '"In the lead box, the six seed stones sit in their corner." - Leave It Open',
    '"the six seed stones sit in their corner" - No Prompt',
  ],
  lore: [
    "lore/overwhere-iii-braid-weaving",
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-corruption",
    "lore/overwhere-iii-corruption-2",
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-07T11:15:00.000Z",
  coverAfter:
    "The last scrap of blight tears free. The little stone cracks into three bright specks.",
} as const satisfies StoryTurnPlayed
