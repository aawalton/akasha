import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveFoundationalEnhancements = {
  id: "01a0e9f0-3dfb-767c-ab8a-bd1dfd542e0a",
  type: "page-type/world-mechanic",
  slug: "super-supportive-foundational-enhancements",
  title: "Foundational Enhancements",
  world: "world/super-supportive",
  aliases: ["foundation", "foundation points", "stat points", "Foundational Supplementation"],
  description:
    "Points added to an Avowed's body and mind, each roughly a 10% improvement over their species' average.",
} as const satisfies WorldMechanic
