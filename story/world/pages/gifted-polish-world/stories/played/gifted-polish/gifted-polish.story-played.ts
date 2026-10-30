import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const giftedPolish = {
  id: "01a18e17-127d-786c-844c-ef1905f2fcbe",
  type: "page-type/story-played",
  slug: "gifted-polish",
  coordinatorAgent: "iris-game-master-gifted-polish",
  clonedFrom: "story-played/gifted-reborn",
  opensAt: "2026-10-28T09:00:00.000Z",
  title: "Gifted: Reborn",
  world: "world/gifted-polish-world",
  unit: "unit/words",
  externalId: "gifted-polish",
  turnSeating: "one-seat",
  chapterBreak: "A day of Nala's new life ends, or a thing she set out to try is done.",
  panels: [
    "played-panel/player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
    "played-panel/player-intent",
    "played-panel/quest-list",
    "played-panel/difficulty",
  ],
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies StoryPlayed
