import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerTheWelcomer01 = {
  id: "01a0c662-cd9e-7658-b1c6-d67181e05ccc",
  type: "page-type/game-entity",
  slug: "the-tower-the-welcomer-01",
  title: "The Welcomer",
  game: "game/the-tower",
  kind: "enemy",
  class: "Glamour-predator",
  equipment: [
    { name: "armor", slot: "armor", defense: 0 },
    { name: "weapon", slot: "weapon", attack: 3 },
  ],
  dice: "game-mechanic/two-d-ten",
  baseDamage: 14,
  typicalIntent: 2,
  note: "engine: VIT8(64)+MIGHT2(18) = 82 HP. physDef (8+14)/2 = 11. physAtk 9*1.5+14+3 = 30.5. Init 13+14 = 27 (beats Alan's 26 on the trust-opener — front-load that turn). Threat = the trust-ambush, not HP.",
} as const satisfies GameEntity
