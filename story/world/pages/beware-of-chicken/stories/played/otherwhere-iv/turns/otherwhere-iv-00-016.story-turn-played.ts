import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00016 = {
  id: "01a0eb25-edfd-7bae-be49-0e16d67ec0b9",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-016",
  cover: "image/image-be020dec3f263978",
  coverAfter: "She stops in the middle of it, where the light is strongest,",
  ownLength: 263,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 16,
  prose: "txt",
  characters: [
    "character-player/otherwhere-iv-nala",
    "character-other/otherwhere-iv-zhao-jun",
    "character-other/otherwhere-iv-tie-bo",
  ],
  stepStatus: "step-status/player",
  action:
    "I bow my head slightly, \"Granny Hua, Tie Bo and I have come to request your poison to be used against the boar that has been foraging Zhau Jun's field. It may be too advanced to be effective, but if it is not, we are seeking for any preparations that reduce the risk of further loss of life. We believe this to be the same boar that took Tie Bo's brother, and it has only grown stronger since. If you have any additional counsel for us in this matter, we would be grateful for it.\"",
  beats: "jsonl",
  lore: ["lore/otherwhere-iv-granny-hua", "lore/otherwhere-iv-nala"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/memory", "story-recorder/picture", "story-recorder/mechanics"],
  endsAt: "2026-09-29T06:33:00.000Z",
} as const satisfies StoryTurnPlayed
