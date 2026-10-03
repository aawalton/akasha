import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const haremHotel0004TheThroneRoom = {
  id: "01a0ef24-cbe9-734a-aa6e-24a8b55965c5",
  type: "page-type/story-chapter-written",
  slug: "harem-hotel-0004-the-throne-room",
  cover: "image/image-f1e32f7974ebb63e",
  position: 4,
  unit: "unit/words",
  title: "The Throne Room",
  story: "story-written/harem-hotel",
  ownLength: 2415,
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  lore: [
    "lore/harem-hotel-odile",
    "lore/harem-hotel-tamsin",
    "lore/harem-hotel-wren",
    "place/harem-hotel-floor-4",
  ],
  characters: [
    "character-other/harem-hotel-odile",
    "character-other/harem-hotel-wren",
    "character-other/harem-hotel-tamsin",
    "character-player/harem-hotel-alan",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
} as const satisfies StoryChapterWritten
