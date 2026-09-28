import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereViiSilenceBarrier = {
  id: "01a0ea42-eb9c-722b-b2c7-a33f525e28b7",
  type: "page-type/world-skill",
  slug: "otherwhere-vii-silence-barrier",
  title: "Silence Barrier",
  world: "world/god-of-trash",
  description: "A bubble around a few people that no sound passes out of.",
  manaCost: 8,
  durationMinutes: 60,
} as const satisfies WorldSkill
