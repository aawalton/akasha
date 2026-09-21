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
  level: 1,
  attributes: [
    { attribute: "game-attribute/finesse", score: 11 },
    { attribute: "game-attribute/intellect", score: 17 },
    { attribute: "game-attribute/luck", score: 11 },
    { attribute: "game-attribute/might", score: 8 },
    { attribute: "game-attribute/perception", score: 15 },
    { attribute: "game-attribute/presence", score: 12 },
    { attribute: "game-attribute/vitality", score: 10 },
    { attribute: "game-attribute/will", score: 14 },
  ],
  traits: [
    {
      name: "Fast Study",
      effect:
        "INTELLECT 17 + the Learn axis — Ali levels skills by use faster than anyone, and can identify unknown enemies/items/mechanics on a read. The party's analyst and skill-engine.",
    },
    {
      name: "True Observer",
      effect:
        "PERCEPTION 15 — actually NOTICES (ambushes, hidden detail, traps), the exact opposite of Alan's Sensitivity-not-Observance. She spots; he reasons. Together they cover the whole detection space.",
    },
    {
      name: "Support Lattice",
      effect:
        "Focus 96 (deepest mental pool in the party) — sustains buffs, debuffs, and utility effects across a long fight without running dry. Force-multiplies the others rather than out-damaging them.",
    },
    {
      name: "Steadier Glass",
      effect:
        "VIT 10 / HP 96 — still a caster, but meaningfully tougher than Alan (70). Can take a stray hit Alan couldn't. Not a frontliner; that's Aelwyn.",
    },
  ],
  dice: "game-mechanic/two-d-ten",
  unspentAttributePoints: 0,
  note: "Tentative. Ali is a SECOND mind — but where Alan is a glass cannon who reads weaknesses, Ali is a sturdier scholar who APPLIES knowledge: skills, support effects, identifying the unknown. The Learn axis embodied. Calibrate against the real persona.",
} as const satisfies GameEntity
