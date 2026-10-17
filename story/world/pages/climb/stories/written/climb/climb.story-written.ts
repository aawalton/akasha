import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const climb = {
  id: "01a0f953-d88d-73bd-871d-b71ac3609abf",
  type: "page-type/story-written",
  slug: "climb",
  title: "The Climb",
  world: "world/climb",
  domain: "domain/explicitness",
  unit: "unit/words",
  chapterBreak: "A floor's task is met and its stairs open.",
  coordinatorAgent: "mari-game-master-climb",
  following: false,
  panels: [
    "played-panel/player-character",
    "played-panel/scene-cover",
    "played-panel/quest-list",
    "played-panel/player-intent",
  ],
  createdAt: "2026-10-01T21:16:56.845Z",
  updatedAt: "2026-10-17T20:50:09.040Z",
} as const satisfies StoryWritten
