import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveFormation = {
  id: "01a0e9f7-dffa-76a1-ae24-e90a12769b97",
  type: "page-type/world-mechanic",
  slug: "super-supportive-formation",
  title: "Formation",
  world: "world/super-supportive",
  description: "A sub-stat of Stamina for resisting unwanted bodily deformation.",
} as const satisfies WorldMechanic
