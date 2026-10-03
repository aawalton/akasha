import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00074 = {
  id: "01a0fe9e-70f0-70bf-8d01-459047637dd0",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-074",
  cover: "image/image-34e1327988419c3f",
  ownLength: 200,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 74,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-marda-hesk"],
  stepStatus: "step-status/player",
  action:
    "I merge them into a glimmerstone and keep going until I’ve finished cleansing the remainder.",
  beats: "jsonl",
  issues: "txt",
  lore: [
    "lore/overwhere-iii-cleansing-weave",
    "lore/overwhere-iii-corruption-2",
    "lore/overwhere-iii-current-feed",
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-marda-hesk-2",
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
  endsAt: "2026-10-07T15:50:00.000Z",
  coverAfter:
    "The core goes white. The stone cracks with a clean ring into one whole glimmerstone.",
} as const satisfies StoryTurnPlayed
