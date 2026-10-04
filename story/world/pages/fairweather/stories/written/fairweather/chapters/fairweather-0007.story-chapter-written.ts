import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0007 = {
  id: "01a10758-b906-731f-94eb-54236d4f20fd",
  type: "page-type/story-chapter-written",
  slug: "fairweather-0007",
  position: 7,
  unit: "unit/words",
  title: "Chapter 7",
  story: "story-written/fairweather",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/mechanics",
  beats: "jsonl",
  lore: ["place/fairweather-lake-villages"],
  recordedBy: ["story-recorder/plan", "story-recorder/inventory"],
} as const satisfies StoryChapterWritten
