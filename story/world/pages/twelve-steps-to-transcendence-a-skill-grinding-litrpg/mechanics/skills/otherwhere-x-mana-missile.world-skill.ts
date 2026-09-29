import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereXManaMissile = {
  id: "01a0ea7a-2e1b-7742-9541-87bd8914c9ef",
  type: "page-type/world-skill",
  slug: "otherwhere-x-mana-missile",
  title: "Mana Missile",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "A skill that fires a bolt of pure mana from the palm.",
} as const satisfies WorldSkill
