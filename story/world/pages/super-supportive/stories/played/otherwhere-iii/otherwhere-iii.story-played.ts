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
    "played-panel/other-characters",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
  ],
} as const satisfies StoryPlayed
