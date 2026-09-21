import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerHostTrueform = {
  id: "01a0c65d-20e0-7a48-8401-c90f1bb352da",
  type: "page-type/game-entity",
  slug: "the-tower-host-trueform",
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
  revealGate: 83,
  note: "130 HP (VIT8*13 + MIGHT2*13). physDef 16 ((13+17)/2+1). physAtk 41.5. Init 33 (acts before Alan 26). Gate: light-pinned x1.5 / reaches-shadow x0.5.",
} as const satisfies GameEntity
