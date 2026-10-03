import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const otherwhereIx = {
  id: "01a0ea1b-c037-7e88-bfb2-f66823290eca",
  type: "page-type/story-played",
  slug: "otherwhere-ix",
  title: "Otherwhere IX",
  world: "world/mana-devourer-litrpgmana-cultivation",
  unit: "unit/words",
  externalId: "otherwhere-ix",
  coordinatorAgent: "iris-game-master-otherwhere-ix",
  chapterBreak: "Nala settles something that changes where she stands in this world.",
  opensAt: "2026-09-28T00:00:00.000Z",
  panels: [
    "played-panel/otherwhere-the-library-player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
  ],
} as const satisfies StoryPlayed
