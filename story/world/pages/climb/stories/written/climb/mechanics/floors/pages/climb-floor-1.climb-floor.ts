import type { ClimbFloor } from "akasha/story/world/pages/climb/stories/written/climb/mechanics/floors/climb-floor.page-type.types.ts"

export const climbFloor1 = {
  id: "01a0f965-e704-7481-8aae-3909e34f2262",
  type: "page-type/climb-floor",
  slug: "climb-floor-1",
  title: "Floor 1: The Bathhouse",
  world: "world/climb",
  character: "character-player/climb-alan",
  objective: "EVERY CLIMBER ON THIS FLOOR COMES ON ANOTHER CLIMBER'S MOUTH.",
  status: "complete",
} as const satisfies ClimbFloor
