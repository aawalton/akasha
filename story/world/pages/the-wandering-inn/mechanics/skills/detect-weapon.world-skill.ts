import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const detectWeapon = {
  id: "01a06575-9803-79f2-80fb-4aad24c0a04d",
  type: "page-type/world-skill",
  slug: "detect-weapon",
  title: "Detect Weapon",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.579Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
