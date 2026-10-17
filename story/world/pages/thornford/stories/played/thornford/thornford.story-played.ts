import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const thornford = {
  id: "01a14b64-8bf8-7598-a38e-0b09fd184787",
  type: "page-type/story-played",
  slug: "thornford",
  title: "Thornford",
  world: "world/thornford",
  unit: "unit/words",
  externalId: "thornford",
  coordinatorAgent: "shaestrel-roleplay-thornford",
  roleplayed: true,
  chapterBreak: "A day ends.",
  opensAt: "2026-04-28T00:00:00.000Z",
  panels: [
    "played-panel/player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
    "played-panel/player-intent",
  ],
  createdAt: "2026-10-17T19:44:03.064Z",
  updatedAt: "2026-10-17T19:51:56.230Z",
} as const satisfies StoryPlayed
