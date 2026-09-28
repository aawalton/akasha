import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveUnboundAuthority = {
  id: "01a0e9f1-065f-7ec0-958a-ddc663fc0aab",
  type: "page-type/world-mechanic",
  slug: "super-supportive-unbound-authority",
  title: "Unbound authority",
  world: "world/super-supportive",
  aliases: ["free authority"],
  description: "The part of an Avowed's authority not yet shaped into talents.",
} as const satisfies WorldMechanic
