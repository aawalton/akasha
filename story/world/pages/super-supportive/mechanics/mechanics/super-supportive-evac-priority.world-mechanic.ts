import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveEvacPriority = {
  id: "01a0e9f7-dffa-7d92-9beb-51bc1f0c99f6",
  type: "page-type/world-mechanic",
  slug: "super-supportive-evac-priority",
  title: "Evac Priority",
  world: "world/super-supportive",
  aliases: ["Evac Priority card"],
  description: "A rescue priority number shown in the interface when entering Apex.",
  createdAt: "2026-09-28T21:42:11.194Z",
  updatedAt: "2026-09-28T21:42:14.000Z",
} as const satisfies WorldMechanic
