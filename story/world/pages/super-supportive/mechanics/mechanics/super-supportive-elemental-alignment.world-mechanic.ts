import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveElementalAlignment = {
  id: "01a0e9f8-aa22-7980-a177-652e09c7a122",
  type: "page-type/world-mechanic",
  slug: "super-supportive-elemental-alignment",
  title: "Elemental alignment",
  world: "world/super-supportive",
  aliases: ["sensing"],
  description: "The Life, Ground or Sky nature of a thing, and finer qualities like patience.",
} as const satisfies WorldMechanic
