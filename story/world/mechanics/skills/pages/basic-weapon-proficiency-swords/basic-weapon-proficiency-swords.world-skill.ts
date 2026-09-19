import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicWeaponProficiencySwords = {
  id: "01a06575-97f4-7458-8f69-66e3ced1077d",
  type: "page-type/world-skill",
  slug: "basic-weapon-proficiency-swords",
  title: "Basic Weapon Proficiency: Swords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
