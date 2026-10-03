import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const otherwhereViii = {
  id: "01a0ea1b-77b0-7488-98e5-fea62542e488",
  type: "page-type/story-played",
  slug: "otherwhere-viii",
  title: "Otherwhere VIII",
  world: "world/breaker-of-horizons",
  unit: "unit/words",
  externalId: "otherwhere-viii",
  coordinatorAgent: "iris-game-master-otherwhere-viii",
  chapterBreak: "Nala settles something that changes where she stands in this world.",
  opensAt: "2026-09-28T00:00:00.000Z",
  panels: [
    "played-panel/otherwhere-the-library-player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
  ],
} as const satisfies StoryPlayed
