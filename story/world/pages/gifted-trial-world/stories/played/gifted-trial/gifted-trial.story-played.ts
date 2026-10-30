import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const giftedTrial = {
  id: "01a18d10-93f1-7a27-8e99-f563747167dd",
  type: "page-type/story-played",
  slug: "gifted-trial",
  coordinatorAgent: "iris-game-master-gifted-trial",
  clonedFrom: "story-played/gifted-reborn",
  opensAt: "2026-10-28T09:00:00.000Z",
  title: "GiftedTrialWorld: Reborn",
  world: "world/gifted-trial-world",
  unit: "unit/words",
  externalId: "gifted-trial",
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
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies StoryPlayed
