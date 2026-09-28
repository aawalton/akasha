import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveBurdenOfSpell = {
  id: "01a0e9f1-d241-79ff-9b75-3a395d1d320f",
  type: "page-type/world-skill",
  slug: "super-supportive-burden-of-spell",
  title: "Burden of Spell",
  world: "world/super-supportive",
  description: "A facet for holding unattached spells, some of which can be cast later.",
} as const satisfies WorldSkill
