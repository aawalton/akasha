import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00091 = {
  id: "01a101ba-9b39-7ecb-9d19-05bf49462210",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-091",
  cover: "image/image-7035f618b2c421d4",
  ownLength: 228,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 91,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-ilsa-crane"],
  stepStatus: "step-status/player",
  action:
    "“I’ll talk with the Four when they wake, if we can lure a full warband, we can start thinning the camp.” I go and take a nap, then pitch my idea.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iv-brookside-four-2",
    "lore/overwhere-iv-ilsa-crane-2",
    "lore/overwhere-iv-millbrook-adventurers-hall-2",
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "lore/overwhere-iv-the-tangle-2",
    "lore/overwhere-iv-the-tangle-3",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/picture",
    "story-recorder/memory",
  ],
  endsAt: "2026-10-07T17:10:00.000Z",
  coverAfter: "You sit up and lay it out for them. Lure a full warband",
} as const satisfies StoryTurnPlayed
