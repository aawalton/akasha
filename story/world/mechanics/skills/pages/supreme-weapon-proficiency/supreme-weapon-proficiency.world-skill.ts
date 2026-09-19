import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const supremeWeaponProficiency = {
  id: "01a0657d-0303-704b-99e2-f48f093491fe",
  type: "page-type/world-skill",
  slug: "supreme-weapon-proficiency",
  title: "Supreme Weapon Proficiency",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
