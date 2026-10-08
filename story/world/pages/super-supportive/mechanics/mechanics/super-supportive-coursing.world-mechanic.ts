import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveCoursing = {
  id: "01a0e9fb-2b66-7b6f-9240-4d4474732bda",
  type: "page-type/world-mechanic",
  slug: "super-supportive-coursing",
  title: "Coursing",
  world: "world/super-supportive",
  aliases: ["obstacle coursing"],
  description:
    "A team sport where runners cross a gym obstacle course while rival teams attack them.",
  createdAt: "2026-09-28T21:45:47.110Z",
  updatedAt: "2026-09-28T21:45:51.000Z",
} as const satisfies WorldMechanic
