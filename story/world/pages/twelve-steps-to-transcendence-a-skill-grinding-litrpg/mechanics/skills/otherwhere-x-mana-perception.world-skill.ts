import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereXManaPerception = {
  id: "01a0ea78-8087-7bed-a312-b625e829ce1a",
  type: "page-type/world-skill",
  slug: "otherwhere-x-mana-perception",
  title: "Mana Perception",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "A skill that widens one's awareness of mana.",
} as const satisfies WorldSkill
