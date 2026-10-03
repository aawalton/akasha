import type { StoryWritten } from "akasha/story/world/stories/written/story-written.page-type.types.ts"

export const thePlacesSheCarries = {
  id: "01a06425-4433-7707-9285-e9cd0605b866",
  type: "page-type/story-written",
  slug: "the-places-she-carries",
  title: "The Places She Carries",
  world: "world/the-places-she-carries",
  unit: "unit/words",
  prose: "txt",
  proseOnBeats: true,
  panels: ["played-panel/player-character", "played-panel/player-intent"],
} as const satisfies StoryWritten
