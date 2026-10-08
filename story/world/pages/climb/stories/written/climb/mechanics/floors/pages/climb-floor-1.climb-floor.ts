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
  createdAt: "2026-10-01T21:36:40.196Z",
  updatedAt: "2026-10-01T21:36:43.000Z",
} as const satisfies ClimbFloor
