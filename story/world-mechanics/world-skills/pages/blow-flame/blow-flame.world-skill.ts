import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const blowFlame = {
  id: "01a06575-97f6-7c93-a28b-edfd689fefd6",
  type: "world-skill",
  slug: "blow-flame",
  title: "Blow Flame",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
