import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerCompanionAelwyn = {
  id: "01a0c65d-20f2-7d6d-8bc5-147bdf3ac4e8",
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
  traits: [
    {
      name: "Guardian",
      effect:
        "Can interpose for an ally — take a hit meant for Alan onto her far larger HP pool (168 vs his 70). The structural fix for his VIT 6 fragility.",
    },
    {
      name: "Immovable",
      effect:
        "VITALITY 17 + WILL 15 — resists knockback, grapples, fear, and attrition. Hard to move, hard to break, hard to rattle.",
    },
    {
      name: "Heavy Hitter",
      effect:
        "MIGHT 16, physAtk 36 — the party's reliable damage floor. Where Alan's 1d20 swings wild, Aelwyn's blows land steady and hard (2d10 bell).",
    },
    {
      name: "Deep Wind",
      effect:
        "Stamina 92 — sustains long fights, sustained pushes, and carries. The party's stamina anchor for marches and prolonged combat.",
    },
  ],
  equipment: [{ name: "worn but sound brigandine", slot: "armor", defense: 3 }],
  dice: "game-mechanic/two-d-ten",
  unspentAttributePoints: 0,
  note: "Tentative. Aelwyn is the BODY Alan does not have — she stands in front so his glass cannon never has to. Calibrate against the real persona (the strength/health axis).",
} as const satisfies GameEntity
