import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveChaosPotential = {
  id: "01a0e9f7-dffa-7e85-af06-268ac36bc75d",
  type: "page-type/world-mechanic",
  slug: "super-supportive-chaos-potential",
  title: "Chaos potential",
  world: "world/super-supportive",
  aliases: ["CP"],
  description: "A person's susceptibility to turning under chaos.",
} as const satisfies WorldMechanic
