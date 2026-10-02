import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const hollowmere = {
  id: "01a0fd0d-d975-7d16-99dd-c745d37f89c4",
  type: "page-type/story-written",
  slug: "hollowmere",
  title: "Hollowmere",
  world: "world/hollowmere",
  domain: "domain/hollowmere-explicitness",
  unit: "unit/words",
  chapterBreak: "A day at Hollowmere ends.",
  coordinatorAgent: "mari-game-master-hollowmere",
  following: true,
  panels: [
    "played-panel/player-character",
    "played-panel/other-characters",
    "played-panel/scene-cover",
  ],
} as const satisfies StoryWritten
