import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerCounterweightColossus01 = {
  id: "01a0c662-cd2e-72a4-abb2-c299e065a9c2",
  type: "page-type/game-entity",
  slug: "the-tower-counterweight-colossus-01",
  title: "Counterweight Colossus (the Warden)",
  game: "game/the-tower",
  note: "computed by engine: VIT8(120)+MIGHT2(32) = 152 HP. physDef (15+6)/2+4 = 14.5. physAtk 16*1.5+6+6 = 36. The HP is a wall unless you hit the pawl.",
} as const satisfies GameEntity
