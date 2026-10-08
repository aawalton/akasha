import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVTeleportation = {
  id: "01a0e9fc-e55e-75bd-a25e-eb64e19188dc",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-teleportation",
  title: "Teleportation",
  world: "world/ends-of-magic",
  aliases: ["Teleport", "gates", "Gate-stones", "Travel"],
  description: "Instant magical travel between places.",
  createdAt: "2026-09-28T21:47:40.254Z",
  updatedAt: "2026-09-28T21:49:28.000Z",
} as const satisfies WorldMechanic
