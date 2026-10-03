import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00094 = {
  id: "01a101f1-cf1a-7749-994c-1244d4c854e2",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-094",
  cover: "image/image-9665aa865bc9a5fe",
  ownLength: 154,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 94,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/player",
  action: "I turn and sprint for the ambush, weaving a bit to dodge slings",
  beats: "jsonl",
  issues: [
    '"a dozen of them" - the hunters are eleven goblins, and the two scouts hang back at the treeline',
  ],
  lore: [
    "lore/overwhere-iv-brookside-four-2",
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
  endsAt: "2026-10-08T09:05:00.000Z",
  coverAfter: "You burst out of the Tangle into the morning light and splash into the ford,",
} as const satisfies StoryTurnPlayed
