import type { StoryGame } from "akasha/story/game/story-game.page-type.types.ts"

export const theVioletHour = {
  id: "01a0673f-a3d8-7000-910a-f80b20ecd496",
  type: "page-type/story-game",
  slug: "the-violet-hour",
  title: "The Violet Hour",
  unit: "unit/words",
  externalId: "the-violet-hour",
  gameEngine: "awen",
  controlledEntityKind: "single",
  mechanicsWeight: "zero",
  resolution: "none",
  displayConfig: "json",
  gmContext: "json",
  panels: ["game-panel/prose-channel"],
} as const satisfies StoryGame
