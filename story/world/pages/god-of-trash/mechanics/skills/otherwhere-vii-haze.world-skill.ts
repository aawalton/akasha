import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereViiHaze = {
  id: "01a0ea42-eb9c-7b5f-a04a-cdd5de865351",
  type: "page-type/world-skill",
  slug: "otherwhere-vii-haze",
  title: "Haze",
  world: "world/god-of-trash",
  description: "A shimmer that slides eyes and senses off those it wraps.",
  manaCost: 10,
  durationMinutes: 30,
} as const satisfies WorldSkill
