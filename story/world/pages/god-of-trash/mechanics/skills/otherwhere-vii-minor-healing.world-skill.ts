import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereViiMinorHealing = {
  id: "01a0ea42-eb9c-7a3e-b219-137ab5cef843",
  type: "page-type/world-skill",
  slug: "otherwhere-vii-minor-healing",
  title: "Minor Healing",
  world: "world/god-of-trash",
  description: "A hand's warmth of mana that knits a small wound or eases a common illness.",
  manaCost: 5,
} as const satisfies WorldSkill
