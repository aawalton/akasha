import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enchantmentFlashfire = {
  id: "01a06575-9808-76c6-b501-adaafff23ffd",
  type: "page-type/world-skill",
  slug: "enchantment-flashfire",
  title: "Enchantment: Flashfire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
