import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const saltAndLamplight0001 = {
  id: "01a0fd06-5aa1-745d-9492-8039e860ce0e",
  type: "page-type/story-chapter-written",
  slug: "salt-and-lamplight-0001",
  position: 1,
  unit: "unit/words",
  title: "Chapter 1",
  story: "story-written/salt-and-lamplight",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: [
    "lore/salt-and-lamplight-morwenna",
    "lore/salt-and-lamplight-nala",
    "lore/salt-and-lamplight-world",
    "place/salt-and-lamplight-morrow-head",
    "place/salt-and-lamplight-penmorrow",
  ],
} as const satisfies StoryChapterWritten
