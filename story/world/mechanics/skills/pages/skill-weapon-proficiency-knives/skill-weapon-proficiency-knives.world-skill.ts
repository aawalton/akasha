import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const skillWeaponProficiencyKnives = {
  id: "01a0657d-02c6-7ad9-9f7d-8ff8dd395bc9",
  type: "page-type/world-skill",
  slug: "skill-weapon-proficiency-knives",
  title: "Skill – Weapon Proficiency: Knives",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
