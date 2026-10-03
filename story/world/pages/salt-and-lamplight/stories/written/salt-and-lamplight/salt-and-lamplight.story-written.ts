import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const saltAndLamplight = {
  id: "01a0fd04-3360-798b-be2b-5d31622d2833",
  type: "page-type/story-written",
  slug: "salt-and-lamplight",
  title: "Salt and Lamplight",
  world: "world/salt-and-lamplight",
  domain: "domain/salt-and-lamplight-explicitness",
  unit: "unit/words",
  chapterBreak: "A day ends, or something between Nala and the keeper turns.",
  coordinatorAgent: "mari-game-master-salt-and-lamplight",
  following: false,
  proseOnBeats: true,
  panels: [
    "played-panel/player-character",
    "played-panel/scene-cover",
    "played-panel/player-intent",
  ],
} as const satisfies StoryWritten
