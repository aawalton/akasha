import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveNeighborhoodTeleportationPoint = {
  id: "01a0e9fc-be82-791b-a9ca-98ac9bac2a7c",
  type: "page-type/world-mechanic",
  slug: "super-supportive-neighborhood-teleportation-point",
  title: "Neighborhood teleportation point",
  world: "world/super-supportive",
  description: "A shared teleport room serving a neighborhood.",
} as const satisfies WorldMechanic
