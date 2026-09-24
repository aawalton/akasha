import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerCompanionAelwyn = {
  id: "01a0c662-ce3d-7985-a7f2-46bd510ca5c3",
  type: "page-type/game-entity",
  slug: "the-tower-companion-aelwyn",
  title: "Aelwyn",
  game: "game/the-tower",
} as const satisfies GameEntity
