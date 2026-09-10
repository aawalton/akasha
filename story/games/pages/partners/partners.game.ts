import type { Game } from "../../game.page-type.types.ts"

export const partners = {
  id: "01a0673f-a3d6-7002-8d32-922da0d57d57",
  pageTypeSlug: "game",
  type: "game",
  slug: "partners",
  title: "Partners",
  unit: "words",
  externalId: "partners",
  gameEngine: "awen",
  turns: "jsonl",
  entities: "jsonl",
  states: "jsonl",
  rolls: "jsonl",
} as const satisfies Game
