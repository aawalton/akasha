import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doorApplyBasicEnchantment = {
  id: "01a06575-9804-76fa-9920-ba01cfa648ad",
  type: "page-type/world-skill",
  slug: "door-apply-basic-enchantment",
  title: "Door: Apply Basic Enchantment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
