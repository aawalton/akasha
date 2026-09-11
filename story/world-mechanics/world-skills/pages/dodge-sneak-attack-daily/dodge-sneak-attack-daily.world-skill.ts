import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const dodgeSneakAttackDaily = {
  id: "01a06575-9804-7e0c-970b-a3641b2d8f6e",
  type: "world-skill",
  slug: "dodge-sneak-attack-daily",
  title: "Dodge Sneak Attack (Daily)",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
