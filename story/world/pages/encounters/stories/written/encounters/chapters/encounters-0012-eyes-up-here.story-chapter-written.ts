import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0012EyesUpHere = {
  id: "01a1303b-a29a-75f0-8bde-e8576f94531f",
  type: "page-type/story-chapter-written",
  slug: "encounters-0012-eyes-up-here",
  position: 12,
  unit: "unit/words",
  title: "Eyes Up Here",
  story: "story-written/encounters",
  ownLength: 8591,
  prose: "txt",
  stepStatus: "step-status/recorders",
  beats: "jsonl",
  lore: ["lore/encounters-callie", "place/encounters-brooks-farm"],
  characters: ["character-player/encounters-alan", "character-other/encounters-callie"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/plan",
    "story-recorder/memory",
  ],
  createdAt: "2026-10-12T13:09:37.049Z",
  updatedAt: "2026-10-12T13:25:18.014Z",
} as const satisfies StoryChapterWritten
