import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerPlinthGolem01 = {
  id: "01a0c662-ccd4-7950-a9c6-1f8c34a163ec",
  type: "page-type/game-entity",
  slug: "the-tower-plinth-golem-01",
  title: "Plinth Golem (the Warden)",
  game: "game/the-tower",
  class: "Stone Warden",
  note: "computed by engine: VIT8(112)+MIGHT2(30) = 142 HP. physDef (14+5)/2+5 = 14.5. physAtk 33.5. The HP is a wall unless you hit the keystone.",
} as const satisfies GameEntity
