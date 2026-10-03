import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00088 = {
  id: "01a1018d-b22d-7d24-84ac-d326b4682f60",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-088",
  cover: "image/image-0dc889398be62c41",
  ownLength: 143,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 88,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/player",
  action:
    "I take the cores as well, then I sneak up the trail toward the smoke, watching with my senses",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "lore/overwhere-iv-the-tangle-2",
    "lore/overwhere-iv-the-tangle-3",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
    "story-recorder/mechanics",
  ],
  endsAt: "2026-10-07T10:50:00.000Z",
  coverAfter: "The other snatches a horn from its belt and lifts it to its lips",
} as const satisfies StoryTurnPlayed
