import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerGloomwardStalker01 = {
  id: "01a0c662-cd00-7ff6-ae97-3b4c4a37c41e",
  type: "page-type/game-entity",
  slug: "the-tower-gloomward-stalker-01",
  title: "Gloomward Stalker",
  game: "game/the-tower",
  kind: "enemy",
  class: "Dark-hunter",
  level: 3,
  attributes: [
    { attribute: "game-attribute/finesse", score: 16 },
    { attribute: "game-attribute/intellect", score: 5 },
    { attribute: "game-attribute/luck", score: 7 },
    { attribute: "game-attribute/might", score: 13 },
    { attribute: "game-attribute/perception", score: 16 },
    { attribute: "game-attribute/presence", score: 6 },
    { attribute: "game-attribute/vitality", score: 9 },
    { attribute: "game-attribute/will", score: 7 },
  ],
  equipment: [
    { name: "armor", slot: "armor", defense: 0 },
    { name: "weapon", slot: "weapon", attack: 4 },
  ],
  dice: "game-mechanic/two-d-ten",
  baseDamage: 12,
  typicalIntent: 2,
  note: "computed by engine: VIT8(72)+MIGHT2(26) = 98 HP. physDef 12.5, physAtk 39.5, Init 32. HP is moderate — the threat is the dark + the ambush, not the HP wall.",
} as const satisfies GameEntity
