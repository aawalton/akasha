import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weaponProficiencySword = {
  id: "01a0657d-032d-787a-9dc9-66091d5cff8f",
  type: "page-type/world-skill",
  slug: "weapon-proficiency-sword",
  title: "Weapon Proficiency: Sword",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.765Z",
  updatedAt: "2026-09-22T13:33:49.000Z",
} as const satisfies WorldSkill
