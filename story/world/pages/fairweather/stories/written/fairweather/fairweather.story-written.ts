import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const fairweather = {
  id: "01a10215-3699-7fef-ab58-970cff34ba37",
  type: "page-type/story-written",
  slug: "fairweather",
  title: "Fairweather",
  world: "world/fairweather",
  domain: "domain/fairweather-explicitness",
  unit: "unit/words",
  chapterBreak: "A day in Lanternmere ends.",
  coordinatorAgent: "mari-game-master-fairweather",
  following: false,
  panels: [
    "played-panel/player-character",
    "played-panel/other-characters",
    "played-panel/scene-cover",
    "played-panel/time",
  ],
} as const satisfies StoryWritten
