import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerCounterweightColossus01 = {
  id: "01a0c65d-1f25-72f9-9c81-c2b7785dbf05",
  type: "page-type/game-entity",
  slug: "the-tower-counterweight-colossus-01",
  title: "Counterweight Colossus (the Warden)",
  game: "game/the-tower",
  kind: "enemy",
  class: "Mechanism Warden",
  level: 4,
  attributes: [
    { attribute: "game-attribute/finesse", score: 6 },
    { attribute: "game-attribute/intellect", score: 7 },
    { attribute: "game-attribute/luck", score: 5 },
    { attribute: "game-attribute/might", score: 16 },
    { attribute: "game-attribute/perception", score: 8 },
    { attribute: "game-attribute/presence", score: 6 },
    { attribute: "game-attribute/vitality", score: 15 },
    { attribute: "game-attribute/will", score: 11 },
  ],
  equipment: [
    { name: "armor", slot: "armor", defense: 4 },
    { name: "weapon", slot: "weapon", attack: 6 },
  ],
  dice: "game-mechanic/two-d-ten",
  baseDamage: 22,
  typicalIntent: 3,
  note: "computed by engine: VIT8(120)+MIGHT2(32) = 152 HP. physDef (15+6)/2+4 = 14.5. physAtk 16*1.5+6+6 = 36. The HP is a wall unless you hit the pawl.",
} as const satisfies GameEntity
