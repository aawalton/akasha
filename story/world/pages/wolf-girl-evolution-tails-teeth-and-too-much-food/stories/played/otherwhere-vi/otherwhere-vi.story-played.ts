import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const otherwhereVi = {
  id: "01a0ea1a-e04c-74e8-8d03-b30e560058af",
  type: "page-type/story-played",
  slug: "otherwhere-vi",
  title: "Otherwhere VI",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  unit: "unit/words",
  externalId: "otherwhere-vi",
  coordinatorAgent: "iris-game-master-otherwhere-vi",
  chapterBreak: "Nala settles something that changes where she stands in this world.",
  opensAt: "2026-09-28T00:00:00.000Z",
  panels: [
    "played-panel/otherwhere-the-library-player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
    "played-panel/player-intent",
  ],
  createdAt: "2026-09-28T22:20:25.036Z",
  updatedAt: "2026-10-03T21:27:44.000Z",
} as const satisfies StoryPlayed
