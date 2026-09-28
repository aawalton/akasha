import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVTeleportation = {
  id: "01a0e9fc-e55e-75bd-a25e-eb64e19188dc",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-teleportation",
  title: "Teleportation",
  world: "world/ends-of-magic",
  aliases: ["Teleport", "gates", "Gate-stones", "Travel"],
  description: "Magic that moves people from one place to another in an instant.",
} as const satisfies WorldMechanic
