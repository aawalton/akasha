import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const blueBoxes = {
  id: "01a14ae6-f163-78c4-9461-aec5f493fbe5",
  type: "page-type/story-played",
  slug: "blue-boxes",
  title: "Blue Boxes",
  world: "world/blue-boxes",
  unit: "unit/words",
  externalId: "blue-boxes",
  coordinatorAgent: "mari",
  roleplayed: true,
  chapterBreak: "Nala and Iris cross a line between them that cannot be uncrossed.",
  opensAt: "2026-10-17T00:00:00.000Z",
  panels: [
    "played-panel/player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
    "played-panel/player-intent",
  ],
  createdAt: "2026-10-17T17:26:51.488Z",
  updatedAt: "2026-10-17T18:04:35.160Z",
} as const satisfies StoryPlayed
