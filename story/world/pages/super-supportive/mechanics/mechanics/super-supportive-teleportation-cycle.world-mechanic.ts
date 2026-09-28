import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveTeleportationCycle = {
  id: "01a0e9f2-9a52-7e64-a951-b3a6593a04e6",
  type: "page-type/world-mechanic",
  slug: "super-supportive-teleportation-cycle",
  title: "Teleportation cycle",
  world: "world/super-supportive",
  description: "A teleport run between two Contracts, started by the one at each end.",
} as const satisfies WorldMechanic
