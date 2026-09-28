import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveWardrobe = {
  id: "01a0e9f2-9a52-7ce5-b9c3-f07b8236abee",
  type: "page-type/world-mechanic",
  slug: "super-supportive-wardrobe",
  title: "Wardrobe",
  world: "world/super-supportive",
  aliases: ["Rabbit's Wardrobe", "Access Wardrobe"],
  description: "A Rabbit-only marketplace of alien work uniforms that raise stats.",
} as const satisfies WorldMechanic
