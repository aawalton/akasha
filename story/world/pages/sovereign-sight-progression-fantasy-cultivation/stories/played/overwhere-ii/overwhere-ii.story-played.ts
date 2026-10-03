import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const overwhereIi = {
  id: "01a0ed0a-24fb-7592-8adb-b5c59019f425",
  type: "page-type/story-played",
  slug: "overwhere-ii",
  title: "Overwhere II",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  unit: "unit/words",
  externalId: "overwhere-ii",
  coordinatorAgent: "iris-game-master-overwhere-ii",
  chapterBreak: "Nala settles something that changes where she stands in this world.",
  opensAt: "2026-09-29T00:00:00.000Z",
  panels: [
    "played-panel/otherwhere-the-library-player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
  ],
} as const satisfies StoryPlayed
