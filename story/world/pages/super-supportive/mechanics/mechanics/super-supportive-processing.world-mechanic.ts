import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveProcessing = {
  id: "01a0e9f7-dffa-720c-bf41-16941dfb1f3a",
  type: "page-type/world-mechanic",
  slug: "super-supportive-processing",
  title: "Processing",
  world: "world/super-supportive",
  aliases: ["mental processing", "mental specs"],
  description: "A mental stat for how fast the mind works, with Visual Processing as a sub-stat.",
  createdAt: "2026-09-28T21:42:11.194Z",
  updatedAt: "2026-09-28T21:42:14.000Z",
} as const satisfies WorldMechanic
