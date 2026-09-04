import type { Game } from "../game.page-type.ts"

export const partners = {
  id: "01a0673f-a3d6-7002-8d32-922da0d57d57",
  pageTypeSlug: "game",
  slug: "partners",
  title: "Partners",
  unitSlug: "words",
  externalId: "partners",
  gameEngine: "awen",
  turns: "jsonl",
  entities: "jsonl",
  states: "jsonl",
  rolls: "jsonl",
} as const satisfies Game
