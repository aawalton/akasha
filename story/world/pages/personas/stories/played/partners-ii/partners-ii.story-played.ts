import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const partnersIi = {
  id: "01a06425-4433-7862-87db-a4cd6e6aa459",
  type: "page-type/story-played",
  slug: "partners-ii",
  title: "Partners II",
  world: "world/personas",
  unit: "unit/words",
  externalId: "partners-ii",
  panels: ["game-panel/aravel-hud", "game-panel/character-sheet", "game-panel/story-so-far"],
} as const satisfies StoryPlayed
