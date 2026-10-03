import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const haremHotel0003TheMasquerade = {
  id: "01a0eb76-4725-7c61-bbed-9e2d37df8646",
  type: "page-type/story-chapter-written",
  slug: "harem-hotel-0003-the-masquerade",
  cover: "image/image-2b06350a92ab3ebf",
  ownProgress: 2052,
  position: 3,
  unit: "unit/words",
  title: "The Masquerade",
  story: "story-written/harem-hotel",
  ownLength: 3090,
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  issues: [
    '"The waltz plays on. Beyond the open mirrored doors, the stairs wait." - Leave It Open',
    '"Beyond the open mirrored doors, the stairs wait." - No Prompt',
    '"her hand is pressed between her thighs through the gold silk" - Harem Hotel Explicitness',
  ],
  lore: [
    "lore/harem-hotel-odile",
    "lore/harem-hotel-tamsin",
    "lore/harem-hotel-wren",
    "place/harem-hotel-floor-3",
  ],
  characters: [
    "character-other/harem-hotel-tamsin",
    "character-other/harem-hotel-wren",
    "character-other/harem-hotel-odile",
    "character-player/harem-hotel-alan",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  pictured: [
    {
      cover: "image/image-2b06350a92ab3ebf",
      coverAfter: "She wears a half-mask of gold filigree, fine gold lacework over her",
      character: "character-other/harem-hotel-tamsin",
      outfit: "naked",
      setting: "the ballroom",
    },
  ],
} as const satisfies StoryChapterWritten
