import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiTeleportation = {
  id: "01a0ea8a-1239-7f26-9acd-badde36af7e2",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-teleportation",
  title: "Teleportation and Portals",
  world: "world/the-calamitous-bob-stubbed",
  description: "Crossing distance at once through a portal, gate or circle.",
} as const satisfies WorldMechanic
