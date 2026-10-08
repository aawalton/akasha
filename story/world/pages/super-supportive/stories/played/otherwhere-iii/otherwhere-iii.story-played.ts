import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const otherwhereIii = {
  id: "01a0e9d4-6105-71fd-a3cb-b0591fb8e002",
  type: "page-type/story-played",
  slug: "otherwhere-iii",
  title: "Otherwhere III",
  world: "world/super-supportive",
  unit: "unit/words",
  externalId: "otherwhere-iii",
  coordinatorAgent: "iris-game-master-otherwhere-iii",
  chapterBreak: "A stretch of Nala's new life comes to a turning point.",
  panels: [
    "played-panel/otherwhere-the-library-player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
    "played-panel/player-intent",
  ],
  createdAt: "2026-09-28T21:03:24.933Z",
  updatedAt: "2026-10-03T21:27:44.000Z",
} as const satisfies StoryPlayed
