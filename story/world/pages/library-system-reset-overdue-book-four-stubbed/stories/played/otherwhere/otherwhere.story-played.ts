import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const otherwhere = {
  id: "01a0e34e-a7be-7410-8c88-eac3dc918f7d",
  type: "page-type/story-played",
  slug: "otherwhere",
  title: "Otherwhere",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  unit: "unit/words",
  externalId: "otherwhere",
  coordinatorAgent: "iris-game-master-otherwhere",
  chapterBreak: "A task the Library set is done.",
  panels: ["played-panel/story-so-far"],
} as const satisfies StoryPlayed
