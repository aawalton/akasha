import type { GameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.types.ts"

export const theTowerRun001 = {
  id: "01a0c958-cfb6-7da4-8c24-febd454b5e59",
  type: "page-type/game-mechanic-run",
  slug: "the-tower-run-001",
  title: "modest success — found rusted iron bar (+4 Atk)",
  game: "story-game/the-tower",
  turn: 1,
  mechanic: "game-mechanic/attribute-check",
  said: "modest success — found rusted iron bar (+4 Atk)",
  workings: "json",
} as const satisfies GameMechanicRun
