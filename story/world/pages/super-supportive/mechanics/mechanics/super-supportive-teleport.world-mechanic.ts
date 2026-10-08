import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveTeleport = {
  id: "01a0e9f2-9a52-778f-92df-ed4f8706d838",
  type: "page-type/world-mechanic",
  slug: "super-supportive-teleport",
  title: "Teleport",
  world: "world/super-supportive",
  aliases: ["local teleportation instance", "custom teleport"],
  description:
    "The System moving a person from one place to another after a countdown, with a moment of nausea.",
  createdAt: "2026-09-28T21:36:25.682Z",
  updatedAt: "2026-09-28T21:36:28.000Z",
} as const satisfies WorldMechanic
