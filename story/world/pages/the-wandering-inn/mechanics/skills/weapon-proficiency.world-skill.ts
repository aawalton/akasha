import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weaponProficiency = {
  id: "01a0657d-032d-7c3b-9d7b-e695db633a93",
  type: "page-type/world-skill",
  slug: "weapon-proficiency",
  title: "Weapon Proficiency",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.765Z",
  updatedAt: "2026-09-22T13:33:49.000Z",
} as const satisfies WorldSkill
