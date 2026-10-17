import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const haremHotel = {
  id: "01a0e821-409c-74fe-bc03-72077ca039cb",
  type: "page-type/story-written",
  slug: "harem-hotel",
  title: "Harem Hotel",
  world: "world/harem-hotel",
  domain: "domain/explicitness",
  unit: "unit/words",
  chapterBreak: "A floor's task is met and its stairs open.",
  coordinatorAgent: "mari-game-master-harem-hotel",
  following: false,
  panels: [
    "played-panel/player-character",
    "played-panel/scene-cover",
    "played-panel/quest-list",
    "played-panel/player-intent",
  ],
  createdAt: "2026-09-28T13:08:08.476Z",
  updatedAt: "2026-10-17T20:50:16.722Z",
} as const satisfies StoryWritten
