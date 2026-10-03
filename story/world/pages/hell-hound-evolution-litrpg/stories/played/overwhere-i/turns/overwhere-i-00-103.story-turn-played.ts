import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00103 = {
  id: "01a0ff56-f3d9-72e9-b77f-945d677cc2a6",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-103",
  cover: "image/image-ed4b7cf7650006d5",
  ownLength: 473,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 103,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala", "character-other/overwhere-i-ghost-eye"],
  stepStatus: "step-status/player",
  action:
    "“Great!” I hand over Ghost Eye’s ears to go with the head, as well as the crew ears and tags, the sallow hythe tin token, and the sealed letter, then go find Ilse for the focus.",
  beats: "jsonl",
  issues: ['"The pearl favours no element" - Plain Negation'],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-wendlow-2",
    "place/overwhere-i-wendlow",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/mechanics",
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-05T13:05:00.000Z",
  coverAfter: "Ilse holds out her palm for the pearl.",
} as const satisfies StoryTurnPlayed
