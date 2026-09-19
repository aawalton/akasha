import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weaponProficiencyClub = {
  id: "01a0657d-032d-7b78-bc1e-c7cb21fbb2f8",
  type: "page-type/world-skill",
  slug: "weapon-proficiency-club",
  title: "Weapon Proficiency: Club",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
