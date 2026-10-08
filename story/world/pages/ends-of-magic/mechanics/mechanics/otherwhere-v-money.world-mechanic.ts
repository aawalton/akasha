import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVMoney = {
  id: "01a0ea04-c282-73b7-b12e-a7fd68722f9b",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-money",
  title: "Money",
  world: "world/ends-of-magic",
  aliases: ["currency", "coin"],
  description: "The currencies of Davrar.",
  createdAt: "2026-09-28T21:56:15.618Z",
  updatedAt: "2026-09-28T21:56:18.000Z",
} as const satisfies WorldMechanic
