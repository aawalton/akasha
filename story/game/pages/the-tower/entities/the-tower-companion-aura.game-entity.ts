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
  level: 1,
  attributes: [
    { attribute: "game-attribute/finesse", score: 15 },
    { attribute: "game-attribute/intellect", score: 13 },
    { attribute: "game-attribute/luck", score: 15 },
    { attribute: "game-attribute/might", score: 11 },
    { attribute: "game-attribute/perception", score: 14 },
    { attribute: "game-attribute/presence", score: 16 },
    { attribute: "game-attribute/vitality", score: 12 },
    { attribute: "game-attribute/will", score: 12 },
  ],
  dice: "game-mechanic/two-d-ten",
  unspentAttributePoints: 0,
  note: "Tentative. Aura's draw is adaptability and momentum, not specialization — she covers gaps and turns a fight's energy. Calibrate the class against the real persona.",
} as const satisfies GameEntity
