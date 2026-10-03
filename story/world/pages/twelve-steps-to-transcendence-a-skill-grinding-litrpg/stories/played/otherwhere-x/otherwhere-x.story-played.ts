import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const otherwhereX = {
  id: "01a0ea5f-8524-79ff-8f4c-a8888996cf80",
  type: "page-type/story-played",
  slug: "otherwhere-x",
  title: "Otherwhere X",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  unit: "unit/words",
  externalId: "otherwhere-x",
  coordinatorAgent: "iris-game-master-otherwhere-x",
  chapterBreak: "Nala settles something that changes where she stands in this world.",
  opensAt: "2026-09-28T00:00:00.000Z",
  panels: [
    "played-panel/otherwhere-the-library-player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
    "played-panel/player-intent",
  ],
} as const satisfies StoryPlayed
