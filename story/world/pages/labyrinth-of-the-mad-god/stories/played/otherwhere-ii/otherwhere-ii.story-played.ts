import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const otherwhereIi = {
  id: "01a0e982-da6b-7326-b333-04aae803aae9",
  type: "page-type/story-played",
  slug: "otherwhere-ii",
  title: "Otherwhere II",
  world: "world/labyrinth-of-the-mad-god",
  unit: "unit/words",
  externalId: "otherwhere-ii",
  coordinatorAgent: "iris-game-master-otherwhere-ii",
  chapterBreak: "A phase of the trial Nala is in comes to its end.",
  opensAt: "2026-09-28T00:00:00.000Z",
  panels: [
    "played-panel/otherwhere-the-library-player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
    "played-panel/player-intent",
  ],
} as const satisfies StoryPlayed
