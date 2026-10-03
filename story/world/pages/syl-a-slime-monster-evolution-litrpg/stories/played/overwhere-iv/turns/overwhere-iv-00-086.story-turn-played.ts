import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00086 = {
  id: "01a10170-9a9a-7fa6-940b-f567a4ab283d",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-086",
  cover: "image/image-98c7c6508f366c6f",
  ownLength: 143,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 86,
  prose: "txt",
  characters: [
    "character-player/overwhere-iv-nala",
    "character-other/overwhere-iv-ilsa-crane",
    "character-other/overwhere-iv-rennick-hale",
    "character-other/overwhere-iv-brenna-holt",
  ],
  stepStatus: "step-status/player",
  action:
    "“I’ll get some sleep, then go scoring again.” Before going to sleep, I go and resign from the guard, thanking them and paying them for the gear, asking if I can keep what I had been using, then sleep and back out to the woods where I ambushed the goblins.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iv-ilsa-crane-2",
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "lore/overwhere-iv-the-tangle-2",
    "place/overwhere-iv-brook-and-barrel",
    "place/overwhere-iv-millbrook",
    "place/overwhere-iv-millbrook-gatehouse",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-07T07:40:00.000Z",
  coverAfter: "He strikes your name from the watch roll with one clean line.",
} as const satisfies StoryTurnPlayed
