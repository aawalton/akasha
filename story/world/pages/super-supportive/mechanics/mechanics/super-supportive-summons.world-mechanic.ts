import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSummons = {
  id: "01a0e9f1-cfc2-72b4-a06c-ea72089afdc6",
  type: "page-type/world-mechanic",
  slug: "super-supportive-summons",
  title: "Summons",
  world: "world/super-supportive",
  aliases: ["quest summons", "being summoned"],
  description: "An Artonan wizard calling an Avowed away to another world to do a task.",
  createdAt: "2026-09-28T21:35:33.826Z",
  updatedAt: "2026-09-28T21:35:36.000Z",
} as const satisfies WorldMechanic
