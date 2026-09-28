import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAgility = {
  id: "01a0e9f7-dff9-7d5b-b9f7-bdcb2c31bb53",
  type: "page-type/world-mechanic",
  slug: "super-supportive-agility",
  title: "Agility",
  world: "world/super-supportive",
  description: "A physical stat for nimble movement, with Proprioception as a sub-stat.",
} as const satisfies WorldMechanic
