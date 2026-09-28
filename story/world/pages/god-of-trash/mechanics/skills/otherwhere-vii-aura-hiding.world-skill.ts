import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereViiAuraHiding = {
  id: "01a0ea42-eb9b-7b37-87ad-0038e67e0f55",
  type: "page-type/world-skill",
  slug: "otherwhere-vii-aura-hiding",
  title: "Aura Hiding",
  world: "world/god-of-trash",
  description: "Mana drawn in tight, so a mage seems a lower Tier, or no mage at all.",
  manaCost: 2,
  durationMinutes: 240,
} as const satisfies WorldSkill
