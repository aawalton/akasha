import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const otherwhereVii = {
  id: "01a0ea1b-2e97-79d8-b0fa-340c65d13de2",
  type: "page-type/story-played",
  slug: "otherwhere-vii",
  title: "Otherwhere VII",
  world: "world/god-of-trash",
  unit: "unit/words",
  externalId: "otherwhere-vii",
  coordinatorAgent: "iris-game-master-otherwhere-vii",
  chapterBreak: "Nala settles something that changes where she stands in this world.",
  opensAt: "2026-09-28T00:00:00.000Z",
  panels: [
    "played-panel/otherwhere-the-library-player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
  ],
} as const satisfies StoryPlayed
