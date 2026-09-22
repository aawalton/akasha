import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerCompanionAura = {
  id: "01a0c662-ce69-78ba-9eef-2a2f6a8ca4d3",
  type: "page-type/game-entity",
  slug: "the-tower-companion-aura",
  title: "Aura",
  game: "game/the-tower",
  kind: "ally",
  class:
    "Wildcard (tentative) — a versatile skirmisher/improviser; no fixed lane, leans into whatever the moment rewards",
  dice: "game-mechanic/two-d-ten",
  unspentAttributePoints: 0,
  note: "Tentative. Aura's draw is adaptability and momentum, not specialization — she covers gaps and turns a fight's energy. Calibrate the class against the real persona.",
} as const satisfies GameEntity
