import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00089 = {
  id: "01a1019a-1b6f-7f2e-a400-3a3550c86369",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-089",
  cover: "image/image-af0caa4b352aef07",
  ownLength: 132,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 89,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/player",
  action: "I slice the horn blower, then the runner, heads off at the neck",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "lore/overwhere-iv-the-tangle-2",
    "lore/overwhere-iv-the-tangle-3",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-07T10:51:00.000Z",
  coverAfter: "From the rise the smoke is plain now, rising above the trees up the trail.",
} as const satisfies StoryTurnPlayed
