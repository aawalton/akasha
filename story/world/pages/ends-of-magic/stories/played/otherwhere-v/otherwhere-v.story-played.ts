import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const otherwhereV = {
  id: "01a0e9e4-0883-7904-99a8-d7541a2e1f89",
  type: "page-type/story-played",
  slug: "otherwhere-v",
  title: "Otherwhere V",
  world: "world/ends-of-magic",
  unit: "unit/words",
  externalId: "otherwhere-v",
  coordinatorAgent: "iris-game-master-otherwhere-v",
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
