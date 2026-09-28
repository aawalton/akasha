import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereViiFireball = {
  id: "01a0ea42-eb9c-736a-9982-c7758879a9fa",
  type: "page-type/world-skill",
  slug: "otherwhere-vii-fireball",
  title: "Fireball",
  world: "world/god-of-trash",
  description: "A ball of fire hurled from the hand that bursts on what it strikes.",
  manaCost: 15,
} as const satisfies WorldSkill
