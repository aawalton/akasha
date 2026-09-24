import type { StoryGame } from "akasha/story/game/story-game.page-type.types.ts"

export const partners = {
  id: "01a0673f-a3d6-7002-8d32-922da0d57d57",
  type: "page-type/story-game",
  slug: "partners",
  title: "Partners",
  unit: "unit/words",
  externalId: "partners",
  gameEngine: "awen",
  coordinatorAgent: "mari-game-master-partners",
  panels: ["game-panel/prose-channel"],
  player: "game-entity/partners-partners-alan",
} as const satisfies StoryGame
