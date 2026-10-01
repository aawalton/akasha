import type { ClimbFloor } from "akasha/story/world/pages/climb/stories/written/climb/mechanics/floors/climb-floor.page-type.types.ts"

export const climbFloor2 = {
  id: "01a0f970-f25c-7d92-9c23-e05a6db49029",
  type: "page-type/climb-floor",
  slug: "climb-floor-2",
  title: "Floor 2: The Masquerade",
  world: "world/climb",
  character: "character-player/climb-alan",
  objective: "EVERY CLIMBER ON THIS FLOOR COMES AT ONCE.",
  status: "complete",
} as const satisfies ClimbFloor
