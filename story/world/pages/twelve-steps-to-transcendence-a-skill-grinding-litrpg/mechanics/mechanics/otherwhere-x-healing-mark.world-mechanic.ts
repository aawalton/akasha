import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXHealingMark = {
  id: "01a0ea7a-dd2a-763f-8e0d-c312b6743109",
  type: "page-type/world-mechanic",
  slug: "otherwhere-x-healing-mark",
  title: "Healing Mark",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "A construct that stores life mana for healing on command.",
} as const satisfies WorldMechanic
