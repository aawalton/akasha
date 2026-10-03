import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const overwhereI = {
  id: "01a0ed09-d9aa-7023-9da0-ffcf76f5ac57",
  type: "page-type/story-played",
  slug: "overwhere-i",
  title: "Overwhere I",
  world: "world/hell-hound-evolution-litrpg",
  unit: "unit/words",
  externalId: "overwhere-i",
  coordinatorAgent: "iris-game-master-overwhere-i",
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
