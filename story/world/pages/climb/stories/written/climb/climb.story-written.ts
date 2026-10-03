import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const climb = {
  id: "01a0f953-d88d-73bd-871d-b71ac3609abf",
  type: "page-type/story-written",
  slug: "climb",
  title: "The Climb",
  world: "world/climb",
  domain: "domain/climb-explicitness",
  unit: "unit/words",
  chapterBreak: "A floor's task is met and its stairs open.",
  coordinatorAgent: "mari-game-master-climb",
  following: true,
  panels: ["played-panel/player-character", "played-panel/scene-cover", "played-panel/quest-list"],
} as const satisfies StoryWritten
