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
  dice: "game-mechanic/two-d-ten",
  unspentAttributePoints: 0,
  note: "Tentative. Aelwyn is the BODY Alan does not have — she stands in front so his glass cannon never has to. Calibrate against the real persona (the strength/health axis).",
} as const satisfies GameEntity
