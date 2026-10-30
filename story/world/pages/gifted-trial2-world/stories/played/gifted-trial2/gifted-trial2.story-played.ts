import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const giftedTrial2 = {
  id: "01a18dab-06cd-77b0-aefc-7bc6caf64e1a",
  type: "page-type/story-played",
  slug: "gifted-trial2",
  coordinatorAgent: "iris-game-master-gifted-trial2",
  turnSeating: "one-seat",
  clonedFrom: "story-played/gifted-reborn",
  opensAt: "2026-10-28T09:00:00.000Z",
  title: "Gifted: Reborn",
  world: "world/gifted-trial2-world",
  unit: "unit/words",
  externalId: "gifted-trial2",
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
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:59.492Z",
} as const satisfies StoryPlayed
