import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportivePreservation = {
  id: "01a0e9f1-065f-7d24-9f0f-18238ea0095f",
  type: "page-type/world-mechanic",
  slug: "super-supportive-preservation",
  title: "Preservation",
  world: "world/super-supportive",
  aliases: ["preserved"],
  description:
    "An item or person held exactly as it is: unchanging, unharmed, and unmovable by outside forces.",
} as const satisfies WorldMechanic
