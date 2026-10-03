import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const haremHotel0001CheckIn = {
  id: "01a0e98b-69e6-7b24-921b-0d0c330bba59",
  type: "page-type/story-chapter-written",
  slug: "harem-hotel-0001-check-in",
  cover: "image/image-ccfd9cd65571a64c",
  completedAt: "2026-09-29T04:25:54.600Z",
  ownProgress: 4106,
  position: 1,
  unit: "unit/words",
  title: "Check-In",
  story: "story-written/harem-hotel",
  ownLength: 4106,
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  issues: "txt",
  lore: ["place/harem-hotel-floor-1"],
  characters: [
    "character-player/harem-hotel-alan",
    "character-other/harem-hotel-odile",
    "character-other/harem-hotel-wren",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
} as const satisfies StoryChapterWritten
