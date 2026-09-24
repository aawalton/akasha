import type { Game } from "akasha/story/game/game.page-type.types.ts"

export const theVioletHour = {
  id: "01a0673f-a3d8-7000-910a-f80b20ecd496",
  type: "page-type/game",
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
} as const satisfies Game
