import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveTeleportAllotment = {
  id: "01a0e9f9-1fa4-7a2c-a3e4-3bcee6855d67",
  type: "page-type/world-mechanic",
  slug: "super-supportive-teleport-allotment",
  title: "teleport allotment",
  world: "world/super-supportive",
  aliases: ["Anesidora's teleport allotment", "teleportation allowance"],
  description: "The limited supply of System teleports given to Anesidora and the rest of Earth.",
  createdAt: "2026-09-28T21:43:33.028Z",
  updatedAt: "2026-09-28T21:43:36.000Z",
} as const satisfies WorldMechanic
