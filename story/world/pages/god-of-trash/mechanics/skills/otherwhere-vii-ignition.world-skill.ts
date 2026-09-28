import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereViiIgnition = {
  id: "01a0ea42-eb9c-7a30-8cb3-028a2d008446",
  type: "page-type/world-skill",
  slug: "otherwhere-vii-ignition",
  title: "Ignition",
  world: "world/god-of-trash",
  description: "A spark of flame kindled from mana pressed through a set shape.",
  manaCost: 3,
} as const satisfies WorldSkill
