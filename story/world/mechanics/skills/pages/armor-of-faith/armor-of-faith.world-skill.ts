import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armorOfFaith = {
  id: "01a06575-97ec-731b-a69a-180c0d1b959e",
  type: "page-type/world-skill",
  slug: "armor-of-faith",
  title: "Armor of Faith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
