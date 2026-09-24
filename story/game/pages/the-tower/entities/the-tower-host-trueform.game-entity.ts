import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerHostTrueform = {
  id: "01a0c662-ce2b-757d-86b6-623768d16be3",
  type: "page-type/game-entity",
  slug: "the-tower-host-trueform",
  title: "The Host — Phase 2, True Form",
  game: "game/the-tower",
  kind: "enemy",
  class: "Haven-predator (unmasked)",
  dice: "game-mechanic/one-d-twenty",
  baseDamage: 20,
  typicalIntent: 4,
  revealGate: 83,
  note: "130 HP (VIT8*13 + MIGHT2*13). physDef 16 ((13+17)/2+1). physAtk 41.5. Init 33 (acts before Alan 26). Gate: light-pinned x1.5 / reaches-shadow x0.5.",
} as const satisfies GameEntity
