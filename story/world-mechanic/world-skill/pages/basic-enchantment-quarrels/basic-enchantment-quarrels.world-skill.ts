import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const basicEnchantmentQuarrels = {
  id: "01a06575-97f3-7975-a0bc-7ee798a3f07c",
  type: "world-skill",
  slug: "basic-enchantment-quarrels",
  title: "Basic Enchantment: Quarrels",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
