import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveTeleportationPriority = {
  id: "01a0e9f9-1fa4-75bf-b7ba-e0e08028de98",
  type: "page-type/world-mechanic",
  slug: "super-supportive-teleportation-priority",
  title: "Teleportation Priority",
  world: "world/super-supportive",
  aliases: ["teleport timer"],
  description:
    "A countdown the System assigns each person until their rescue teleport in a disaster.",
} as const satisfies WorldMechanic
