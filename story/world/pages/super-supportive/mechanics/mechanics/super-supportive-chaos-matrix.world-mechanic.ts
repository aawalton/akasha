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
} as const satisfies WorldMechanic
