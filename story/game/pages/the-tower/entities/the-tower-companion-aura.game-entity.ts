import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerCompanionAura = {
  id: "01a0c662-ce69-78ba-9eef-2a2f6a8ca4d3",
  type: "page-type/game-entity",
  slug: "the-tower-companion-aura",
  title: "Aura",
  game: "game/the-tower",
} as const satisfies GameEntity
