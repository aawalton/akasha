import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveProprioception = {
  id: "01a0e9f7-dffa-7637-a21e-21a130253099",
  type: "page-type/world-mechanic",
  slug: "super-supportive-proprioception",
  title: "Proprioception",
  world: "world/super-supportive",
  description: "A stat for the sense of where one's body is, listed under Agility.",
} as const satisfies WorldMechanic
