import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAvowedCommunicationsNetwork = {
  id: "01a0e9f2-9a50-703a-93e7-268d5afabc79",
  type: "page-type/world-mechanic",
  slug: "super-supportive-avowed-communications-network",
  title: "Avowed Communications Network",
  world: "world/super-supportive",
  description: "The System's phone network for a planet, through which people can call Avowed.",
} as const satisfies WorldMechanic
