import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveDisasterAlert = {
  id: "01a0e9f9-1fa2-78b5-99c7-f592e76a7498",
  type: "page-type/world-mechanic",
  slug: "super-supportive-disaster-alert",
  title: "Disaster Alert",
  world: "world/super-supportive",
  aliases: ["Disaster Update", "Disaster Advisory"],
  description: "System notices that warn of a disaster and follow it with updates and advisories.",
} as const satisfies WorldMechanic
