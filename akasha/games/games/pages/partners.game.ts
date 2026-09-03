import type { Game } from "../game.page-type.ts"

export const partners = {
  id: "01a0673e-7218-7002-b8c2-7899a0d57d57",
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
