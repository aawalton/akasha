import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerTheHost01 = {
  id: "01a0c662-cdee-7350-ba7e-96db9d614f44",
  type: "page-type/game-entity",
  slug: "the-tower-the-host-01",
  title: "The Host (Warden of the Haven) — Phase 1, the Weaver",
  game: "game/the-tower",
  kind: "enemy",
  class: "Gallery Warden",
  level: 5,
  attributes: [
    { attribute: "game-attribute/finesse", score: 10 },
    { attribute: "game-attribute/intellect", score: 16 },
    { attribute: "game-attribute/luck", score: 6 },
    { attribute: "game-attribute/might", score: 12 },
    { attribute: "game-attribute/perception", score: 12 },
    { attribute: "game-attribute/presence", score: 17 },
    { attribute: "game-attribute/vitality", score: 15 },
    { attribute: "game-attribute/will", score: 14 },
  ],
  equipment: [
    { name: "armor", slot: "armor", defense: 2 },
    { name: "weapon", slot: "weapon", attack: 4 },
  ],
  dice: "game-mechanic/two-d-ten",
  baseDamage: 18,
  typicalIntent: 3,
  note: "engine: VIT8(120)+MIGHT2(24) = 144 HP. physDef (15+10)/2+2 = 14.5. physAtk 12*1.5+10+4 = 32. Init 12+10 = 22 (Alan's 26 first, but worthless until he's IDed the real one). HP a wall only if you brute the decoys.",
} as const satisfies GameEntity
