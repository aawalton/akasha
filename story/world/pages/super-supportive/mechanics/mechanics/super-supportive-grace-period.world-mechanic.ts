import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveGracePeriod = {
  id: "01a0e9f0-3dfb-7c55-b3d6-85e69ab6351f",
  type: "page-type/world-mechanic",
  slug: "super-supportive-grace-period",
  title: "Grace period",
  world: "world/super-supportive",
  aliases: ["ninety Earth days"],
  description: "The ninety Earth days a selectee has to decide on the Contract before affixation.",
} as const satisfies WorldMechanic
