import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const otherwhereXi = {
  id: "01a0ea62-dbb1-7d6a-b868-88d984625d64",
  type: "page-type/story-played",
  slug: "otherwhere-xi",
  title: "Otherwhere XI",
  world: "world/the-calamitous-bob-stubbed",
  unit: "unit/words",
  externalId: "otherwhere-xi",
  coordinatorAgent: "iris-game-master-otherwhere-xi",
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
