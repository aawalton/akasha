import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSpeed = {
  id: "01a0e9f7-dffa-708a-af26-52907cfc01a7",
  type: "page-type/world-mechanic",
  slug: "super-supportive-speed",
  title: "Speed",
  world: "world/super-supportive",
  description: "A physical stat for how fast a person moves.",
} as const satisfies WorldMechanic
