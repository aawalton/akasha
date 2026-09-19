import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weaponProficiencySpear = {
  id: "01a0657d-032d-7126-b1d4-07078584a312",
  type: "page-type/world-skill",
  slug: "weapon-proficiency-spear",
  title: "Weapon Proficiency: Spear",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
