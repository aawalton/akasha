import type { Game } from "../game.page-type.ts"

export const theVioletHour = {
  id: "01a0673f-a3d8-7000-910a-f80b20ecd496",
  pageTypeSlug: "game",
  slug: "the-violet-hour",
  title: "The Violet Hour",
  unitSlug: "words",
  externalId: "the-violet-hour",
  gameEngine: "awen",
  coordinatorAgent: "awen-gm--the-violet-hour",
  controlledEntityKind: "single",
  mechanicsWeight: "zero",
  resolution: "none",
  displayConfig: "json",
  gmContext: "json",
  turns: "jsonl",
  entities: "jsonl",
} as const satisfies Game
