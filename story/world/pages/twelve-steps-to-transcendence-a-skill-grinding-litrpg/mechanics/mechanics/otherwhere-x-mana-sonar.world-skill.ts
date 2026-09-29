import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereXManaSonar = {
  id: "01a0ea78-8087-77f2-949c-059a9796850d",
  type: "page-type/world-skill",
  slug: "otherwhere-x-mana-sonar",
  title: "Mana Sonar",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "A skill that maps the surroundings with pulses of mana.",
} as const satisfies WorldSkill
