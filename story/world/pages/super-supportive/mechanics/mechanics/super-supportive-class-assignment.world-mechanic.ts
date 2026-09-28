import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveClassAssignment = {
  id: "01a0e9f0-3dfa-7331-b918-a94dbbb68de0",
  type: "page-type/world-mechanic",
  slug: "super-supportive-class-assignment",
  title: "Class assignment",
  world: "world/super-supportive",
  aliases: ["Assigned Class"],
  description: "The class the System gives a selectee when choosing them.",
} as const satisfies WorldMechanic
