import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const detectWeapon = {
  id: "01a06575-9803-79f2-80fb-4aad24c0a04d",
  type: "page-type/world-skill",
  slug: "detect-weapon",
  title: "Detect Weapon",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
