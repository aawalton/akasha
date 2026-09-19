import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weaponProficiency = {
  id: "01a0657d-032d-7c3b-9d7b-e695db633a93",
  type: "page-type/world-skill",
  slug: "weapon-proficiency",
  title: "Weapon Proficiency",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
