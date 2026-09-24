import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerTheHost01 = {
  id: "01a0c662-cdee-7350-ba7e-96db9d614f44",
  type: "page-type/game-entity",
  slug: "the-tower-the-host-01",
  title: "The Host (Warden of the Haven) — Phase 1, the Weaver",
  game: "game/the-tower",
  class: "Gallery Warden",
  note: "engine: VIT8(120)+MIGHT2(24) = 144 HP. physDef (15+10)/2+2 = 14.5. physAtk 12*1.5+10+4 = 32. Init 12+10 = 22 (Alan's 26 first, but worthless until he's IDed the real one). HP a wall only if you brute the decoys.",
} as const satisfies GameEntity
