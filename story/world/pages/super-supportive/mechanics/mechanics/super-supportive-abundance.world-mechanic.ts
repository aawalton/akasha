import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAbundance = {
  id: "01a0e9f8-aa21-75c3-b53e-d0bb48c2b243",
  type: "page-type/world-mechanic",
  slug: "super-supportive-abundance",
  title: "Abundance",
  world: "world/super-supportive",
  description: "The potential for all, present when a spell is cast.",
} as const satisfies WorldMechanic
