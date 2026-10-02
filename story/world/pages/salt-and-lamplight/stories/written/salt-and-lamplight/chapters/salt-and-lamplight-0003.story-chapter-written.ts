import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const saltAndLamplight0003 = {
  id: "01a0fd3b-b750-7e6e-93d6-4356d7c91151",
  type: "page-type/story-chapter-written",
  slug: "salt-and-lamplight-0003",
  position: 3,
  unit: "unit/words",
  title: "Chapter 3",
  story: "story-written/salt-and-lamplight",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: [
    "lore/salt-and-lamplight-morwenna",
    "lore/salt-and-lamplight-world",
    "place/salt-and-lamplight-morrow-head",
  ],
} as const satisfies StoryChapterWritten
