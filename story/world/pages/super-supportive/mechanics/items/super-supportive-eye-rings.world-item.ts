import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveEyeRings = {
  id: "01a0e9f8-6bb3-7396-a52b-90e3e7325e55",
  type: "page-type/world-item",
  slug: "super-supportive-eye-rings",
  title: "eye rings",
  world: "world/super-supportive",
  aliases: ["eyerings", "iris rings"],
  description: "Metal rings worn around an Artonan's irises.",
} as const satisfies WorldItem
