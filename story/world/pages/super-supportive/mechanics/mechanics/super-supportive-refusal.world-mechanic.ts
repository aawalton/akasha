import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveRefusal = {
  id: "01a0e9f1-cfc2-7441-9fd3-14915df640ad",
  type: "page-type/world-mechanic",
  slug: "super-supportive-refusal",
  title: "Refusal",
  world: "world/super-supportive",
  aliases: ["refusals"],
  description: "A banked right to turn down a quest.",
  createdAt: "2026-09-28T21:35:33.826Z",
  updatedAt: "2026-09-28T21:35:36.000Z",
} as const satisfies WorldMechanic
