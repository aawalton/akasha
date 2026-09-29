import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereXManaCannon = {
  id: "01a0ea7a-2e1b-7167-be2f-ccc7526aeebc",
  type: "page-type/world-skill",
  slug: "otherwhere-x-mana-cannon",
  title: "Mana Cannon",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "A skill that fires a heavy blast of pure mana.",
} as const satisfies WorldSkill
