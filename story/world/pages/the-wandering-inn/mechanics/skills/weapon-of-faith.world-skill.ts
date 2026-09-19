import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weaponOfFaith = {
  id: "01a0657d-032d-7b85-a831-de8e7a44cdea",
  type: "page-type/world-skill",
  slug: "weapon-of-faith",
  title: "Weapon of Faith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
