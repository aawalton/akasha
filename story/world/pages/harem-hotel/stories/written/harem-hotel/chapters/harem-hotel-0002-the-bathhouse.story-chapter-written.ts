import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const haremHotel0002TheBathhouse = {
  id: "01a0eb67-e6e2-74d1-a371-ece696437939",
  type: "page-type/story-chapter-written",
  slug: "harem-hotel-0002-the-bathhouse",
  cover: "image/image-a756bb5371e1c852",
  completedAt: "2026-09-29T04:40:09.056Z",
  ownProgress: 3296,
  position: 2,
  unit: "unit/words",
  title: "The Bathhouse",
  story: "story-written/harem-hotel",
  ownLength: 3296,
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  lore: ["lore/harem-hotel-odile", "lore/harem-hotel-wren", "place/harem-hotel-floor-2"],
  characters: [
    "character-other/harem-hotel-wren",
    "character-other/harem-hotel-odile",
    "character-player/harem-hotel-alan",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  pictured: [
    {
      cover: "image/image-a756bb5371e1c852",
      coverAfter: "She lies along it on her back with one knee up and",
      character: "character-other/harem-hotel-wren",
      outfit: "naked",
      setting: "the bathhouse",
    },
  ],
} as const satisfies StoryChapterWritten
