import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerCompanionAli = {
  id: "01a0c662-ce56-7ef6-a594-a8936f5228a3",
  type: "page-type/game-entity",
  slug: "the-tower-companion-ali",
  title: "Ali",
  game: "game/the-tower",
  kind: "ally",
  class:
    "Lorebinder (tentative) — support/utility caster-analyst; learns fast, buffs, debuffs, and turns knowledge into leverage",
  unspentAttributePoints: 0,
  note: "Tentative. Ali is a SECOND mind — but where Alan is a glass cannon who reads weaknesses, Ali is a sturdier scholar who APPLIES knowledge: skills, support effects, identifying the unknown. The Learn axis embodied. Calibrate against the real persona.",
} as const satisfies GameEntity
