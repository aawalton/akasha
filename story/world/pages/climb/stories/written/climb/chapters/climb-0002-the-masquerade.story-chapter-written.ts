import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const climb0002TheMasquerade = {
  id: "01a0f967-938d-7cba-8728-a9ee1f63f84b",
  type: "page-type/story-chapter-written",
  slug: "climb-0002-the-masquerade",
  completedAt: "2026-10-04T15:14:13.091Z",
  ownProgress: 2638,
  position: 2,
  unit: "unit/words",
  title: "The Masquerade",
  story: "story-written/climb",
  ownLength: 2638,
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  issues: "txt",
  lore: ["lore/climb-clara", "lore/climb-ines", "lore/climb-mina", "place/climb-floor-2"],
  characters: [
    "character-player/climb-alan",
    "character-other/climb-mina",
    "character-other/climb-clara",
    "character-other/climb-ines",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/mechanics",
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/picture",
  ],
} as const satisfies StoryChapterWritten
