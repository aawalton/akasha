import type { Game } from "akasha/story/game/game.page-type.types.ts"

export const partners = {
  id: "01a0673f-a3d6-7002-8d32-922da0d57d57",
  type: "page-type/game",
  slug: "partners",
  title: "Partners",
  unit: "unit/words",
  externalId: "partners",
  gameEngine: "awen",
  turns: "jsonl",
  entities: "jsonl",
  states: "jsonl",
  rolls: "jsonl",
  panels: ["game-panel/prose-channel"],
  player: "game-entity/partners-partners-alan",
} as const satisfies Game
