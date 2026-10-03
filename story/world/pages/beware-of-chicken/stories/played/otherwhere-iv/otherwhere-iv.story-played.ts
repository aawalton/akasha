import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const otherwhereIv = {
  id: "01a0e9e0-0274-7b2e-a7d2-59463d21651c",
  type: "page-type/story-played",
  slug: "otherwhere-iv",
  title: "Otherwhere IV",
  world: "world/beware-of-chicken",
  unit: "unit/words",
  externalId: "otherwhere-iv",
  coordinatorAgent: "iris-game-master-otherwhere-iv",
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
