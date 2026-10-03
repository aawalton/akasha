import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const emberdeep = {
  id: "01a0fdaf-81ba-7d03-98ee-74723576d327",
  type: "page-type/story-written",
  slug: "emberdeep",
  title: "Emberdeep",
  world: "world/emberdeep",
  domain: "domain/emberdeep-explicitness",
  unit: "unit/words",
  chapterBreak: "A day in Emberdeep ends.",
  coordinatorAgent: "mari-game-master-emberdeep",
  following: false,
  panels: [
    "played-panel/player-character",
    "played-panel/scene-cover",
    "played-panel/player-intent",
  ],
} as const satisfies StoryWritten
