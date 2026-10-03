import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00092 = {
  id: "01a101c8-7c74-7913-9aa7-88feb455b311",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-092",
  cover: "image/image-904347ae2dabdbe0",
  ownLength: 161,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 92,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/player",
  action:
    "“Leave that to me.” The next day, we go and find the right place for the ambush, then I move quietly toward the camp, senses wide so I see the goblins before they see me.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iv-brookside-four-2",
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "lore/overwhere-iv-the-tangle-2",
    "lore/overwhere-iv-the-tangle-3",
    "place/overwhere-iv-tull-farm",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-08T08:45:00.000Z",
  coverAfter: "Behind them, out past your reach, comes a low muttering, many voices.",
} as const satisfies StoryTurnPlayed
