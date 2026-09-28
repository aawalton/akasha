import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereViiWeaponIntent = {
  id: "01a0ea42-eb9c-76c2-8388-ead40c57b63a",
  type: "page-type/world-skill",
  slug: "otherwhere-vii-weapon-intent",
  title: "Weapon Intent",
  world: "world/god-of-trash",
  description: "Mana sent from the hand into a weapon as a blade-sharp edge, even on a stick.",
  manaCost: 4,
  durationMinutes: 5,
} as const satisfies WorldSkill
