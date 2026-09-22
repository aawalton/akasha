import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerCompanionAelwyn = {
  id: "01a0c662-ce3d-7985-a7f2-46bd510ca5c3",
  type: "page-type/game-entity",
  slug: "the-tower-companion-aelwyn",
  title: "Aelwyn",
  game: "game/the-tower",
  kind: "ally",
  class:
    "Bulwark (tentative) — frontline tank/protector; holds the line, soaks hits, controls space",
  level: 1,
  attributes: [
    { attribute: "game-attribute/finesse", score: 12 },
    { attribute: "game-attribute/intellect", score: 11 },
    { attribute: "game-attribute/luck", score: 9 },
    { attribute: "game-attribute/might", score: 16 },
    { attribute: "game-attribute/perception", score: 12 },
    { attribute: "game-attribute/presence", score: 13 },
    { attribute: "game-attribute/vitality", score: 17 },
    { attribute: "game-attribute/will", score: 15 },
  ],
  equipment: [{ name: "worn but sound brigandine", slot: "armor", defense: 3 }],
  dice: "game-mechanic/two-d-ten",
  unspentAttributePoints: 0,
  note: "Tentative. Aelwyn is the BODY Alan does not have — she stands in front so his glass cannon never has to. Calibrate against the real persona (the strength/health axis).",
} as const satisfies GameEntity
