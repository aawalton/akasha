import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveBurdenOfEnchantment = {
  id: "01a0e9f1-d241-78f8-a800-1c387e863cfd",
  type: "page-type/world-skill",
  slug: "super-supportive-burden-of-enchantment",
  title: "Burden of Enchantment",
  world: "world/super-supportive",
  aliases: ["enchantment preservation"],
  description: "A facet that removes and preserves only the magical enchantments on an object.",
} as const satisfies WorldSkill
