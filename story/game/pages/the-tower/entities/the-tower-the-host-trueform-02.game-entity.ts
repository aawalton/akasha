import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerTheHostTrueform02 = {
  id: "01a0c662-ce1a-75ce-b1ca-93bfaabe3eec",
  type: "page-type/game-entity",
  slug: "the-tower-the-host-trueform-02",
  title: "The Host — Phase 2, True Form",
  game: "game/the-tower",
  kind: "enemy",
  class: "Haven-predator (unmasked)",
  level: 5,
  attributes: [
    { attribute: "game-attribute/finesse", score: 17 },
    { attribute: "game-attribute/intellect", score: 16 },
    { attribute: "game-attribute/luck", score: 7 },
    { attribute: "game-attribute/might", score: 13 },
    { attribute: "game-attribute/perception", score: 16 },
    { attribute: "game-attribute/presence", score: 8 },
    { attribute: "game-attribute/vitality", score: 13 },
    { attribute: "game-attribute/will", score: 15 },
  ],
  equipment: [
    { name: "armor", slot: "armor", defense: 1 },
    { name: "weapon", slot: "weapon", attack: 5 },
  ],
  dice: "game-mechanic/one-d-twenty",
  baseDamage: 20,
  typicalIntent: 4,
  note: "engine: VIT8(104)+MIGHT2(26) = 130 HP. physDef (13+17)/2+1 = 16. physAtk 13*1.5+17+5 = 41.5. Init 16+17 = 33 (acts before Alan's 26 — the core of the threat). 1d20 Wild Variance = real spike risk both ways.",
} as const satisfies GameEntity
