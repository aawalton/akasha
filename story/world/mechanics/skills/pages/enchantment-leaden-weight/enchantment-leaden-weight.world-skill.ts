import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enchantmentLeadenWeight = {
  id: "01a06575-9808-7483-8d30-669e6f726ebd",
  type: "page-type/world-skill",
  slug: "enchantment-leaden-weight",
  title: "Enchantment: Leaden Weight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
