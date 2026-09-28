import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveObstacleCourseRace = {
  id: "01a0e9f9-1fa2-711c-9b6b-6b82d4b01932",
  type: "page-type/world-mechanic",
  slug: "super-supportive-obstacle-course-race",
  title: "MagiPhys obstacle course race",
  world: "world/super-supportive",
  aliases: ["obstacle course"],
  description: "A gym race in which two teams of ten or eleven run mirrored courses.",
} as const satisfies WorldMechanic
