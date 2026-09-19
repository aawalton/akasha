import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const expertWeaponProficiencySword = {
  id: "01a06575-980a-7089-befb-9302589d3c53",
  type: "page-type/world-skill",
  slug: "expert-weapon-proficiency-sword",
  title: "Expert Weapon Proficiency: Sword",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
