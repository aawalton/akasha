import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveBoundAuthority = {
  id: "01a0e9f1-065e-759d-a6f2-437060fb8284",
  type: "page-type/world-mechanic",
  slug: "super-supportive-bound-authority",
  title: "Bound authority",
  world: "world/super-supportive",
  aliases: ["fixed talents"],
  description: "The part of an Avowed's authority shaped into their skills and trait.",
} as const satisfies WorldMechanic
