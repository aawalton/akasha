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
  following: false,
  wordBacklog: 25000,
  panels: [
    "played-panel/player-character",
    "played-panel/scene-cover",
    "played-panel/player-intent",
  ],
  createdAt: "2026-10-02T14:38:58.421Z",
  updatedAt: "2026-10-06T10:26:17.000Z",
} as const satisfies StoryWritten
