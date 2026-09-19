import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const freeSwapEquipment = {
  id: "01a06575-9810-7df3-8119-2523ade6e894",
  type: "page-type/world-skill",
  slug: "free-swap-equipment",
  title: "Free Swap: Equipment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
