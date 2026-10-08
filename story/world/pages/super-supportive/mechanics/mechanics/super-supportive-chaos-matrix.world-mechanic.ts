import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveChaosMatrix = {
  id: "01a0e9fb-2b66-738a-994e-85a6df815669",
  type: "page-type/world-mechanic",
  slug: "super-supportive-chaos-matrix",
  title: "Chaos matrix",
  world: "world/super-supportive",
  aliases: ["high-risk chaos matrix"],
  description:
    "A person the Contract flags as at unusually high risk of becoming a problematic entity if exposed to chaos.",
  createdAt: "2026-09-28T21:45:47.110Z",
  updatedAt: "2026-09-28T21:45:51.000Z",
} as const satisfies WorldMechanic
