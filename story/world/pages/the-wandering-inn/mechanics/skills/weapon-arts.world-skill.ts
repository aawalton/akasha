import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weaponArts = {
  id: "01a0657d-032d-7e4e-93e5-7d9bbeef3aae",
  type: "page-type/world-skill",
  slug: "weapon-arts",
  title: "Weapon Arts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
