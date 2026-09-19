import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const accidentProtectionMonsters = {
  id: "01a06575-97e8-78f2-9c05-20e0dcc11dd7",
  type: "page-type/world-skill",
  slug: "accident-protection-monsters",
  title: "Accident Protection: Monsters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
