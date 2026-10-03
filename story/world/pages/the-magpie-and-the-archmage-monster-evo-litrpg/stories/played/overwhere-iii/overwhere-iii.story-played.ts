import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const overwhereIii = {
  id: "01a0ed0a-7271-738e-984a-79bcb6d22058",
  type: "page-type/story-played",
  slug: "overwhere-iii",
  title: "Overwhere III",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  unit: "unit/words",
  externalId: "overwhere-iii",
  coordinatorAgent: "iris-game-master-overwhere-iii",
  chapterBreak: "Nala settles something that changes where she stands in this world.",
  opensAt: "2026-09-29T00:00:00.000Z",
  panels: [
    "played-panel/otherwhere-the-library-player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
  ],
} as const satisfies StoryPlayed
