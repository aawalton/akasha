import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const giftedReborn = {
  id: "01a17edf-d61e-70e1-90ec-fc5f0aacf6e3",
  type: "page-type/story-played",
  slug: "gifted-reborn",
  title: "Gifted: Reborn",
  world: "world/gifted",
  unit: "unit/words",
  externalId: "gifted-reborn",
  chapterBreak: "A day of Nala's new life ends, or a thing she set out to try is done.",
  opensAt: "2026-10-27T20:30:00.000Z",
  panels: [
    "played-panel/player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
    "played-panel/player-intent",
    "played-panel/quest-list",
  ],
  createdAt: "2026-10-27T19:39:20.989Z",
  updatedAt: "2026-10-27T19:39:20.989Z",
} as const satisfies StoryPlayed
