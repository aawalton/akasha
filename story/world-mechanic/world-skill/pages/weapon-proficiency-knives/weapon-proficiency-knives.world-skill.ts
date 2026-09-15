import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const weaponProficiencyKnives = {
  id: "01a0657d-032d-7cde-9b22-abd152e27445",
  type: "world-skill",
  slug: "weapon-proficiency-knives",
  title: "Weapon Proficiency: Knives",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
