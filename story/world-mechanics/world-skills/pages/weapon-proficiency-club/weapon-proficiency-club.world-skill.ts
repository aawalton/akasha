import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const weaponProficiencyClub = {
  id: "01a0657d-032d-7b78-bc1e-c7cb21fbb2f8",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "weapon-proficiency-club",
  title: "Weapon Proficiency: Club",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
