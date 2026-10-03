import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const overwhereIv = {
  id: "01a0ed0a-bdd7-744f-924e-f915f286ba0f",
  type: "page-type/story-played",
  slug: "overwhere-iv",
  title: "Overwhere IV",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  unit: "unit/words",
  externalId: "overwhere-iv",
  coordinatorAgent: "iris-game-master-overwhere-iv",
  chapterBreak: "Nala settles something that changes where she stands in this world.",
  opensAt: "2026-09-29T00:00:00.000Z",
  panels: [
    "played-panel/otherwhere-the-library-player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
    "played-panel/player-intent",
  ],
} as const satisfies StoryPlayed
