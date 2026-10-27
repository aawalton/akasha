import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const testStory = {
  id: "01a17ec6-053a-7bbd-aebe-77e7d77942c2",
  type: "page-type/story-played",
  slug: "test-story",
  title: "Test Story",
  world: "world/test-world",
  unit: "unit/words",
  externalId: "test-story",
  chapterBreak: "A thing the player set out to try is done.",
  opensAt: "2026-10-27T08:00:00.000Z",
  panels: [
    "played-panel/player-character",
    "played-panel/other-characters",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
    "played-panel/player-intent",
    "played-panel/quest-list",
    "played-panel/otherwhere-the-library-map",
  ],
  createdAt: "2026-10-27T19:11:09.113Z",
  updatedAt: "2026-10-27T19:11:09.113Z",
} as const satisfies StoryPlayed
