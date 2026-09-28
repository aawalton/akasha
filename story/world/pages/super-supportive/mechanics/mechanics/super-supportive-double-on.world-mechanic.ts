import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveDoubleOn = {
  id: "01a0e9f5-fded-710b-a04c-04deefac06ca",
  type: "page-type/world-mechanic",
  slug: "super-supportive-double-on",
  title: "double-on",
  world: "world/super-supportive",
  aliases: ["double-on their stats"],
  description: "A rare breakthrough in which an Avowed learns to double-on their stats.",
} as const satisfies WorldMechanic
