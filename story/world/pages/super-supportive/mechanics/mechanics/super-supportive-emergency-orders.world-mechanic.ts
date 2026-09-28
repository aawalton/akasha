import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveEmergencyOrders = {
  id: "01a0e9f5-fded-7597-9f65-11083b7f60de",
  type: "page-type/world-mechanic",
  slug: "super-supportive-emergency-orders",
  title: "Emergency orders",
  world: "world/super-supportive",
  aliases: ["EMERGENCY ORDERS ISSUED", "OFFICIAL ORDER"],
  description: "Orders the System issues to Avowed during a disaster.",
} as const satisfies WorldMechanic
