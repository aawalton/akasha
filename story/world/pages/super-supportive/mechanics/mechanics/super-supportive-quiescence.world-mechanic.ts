import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveQuiescence = {
  id: "01a0e9f8-aa22-7510-8083-a3b50962feb3",
  type: "page-type/world-mechanic",
  slug: "super-supportive-quiescence",
  title: "Self-protection through quiescence",
  world: "world/super-supportive",
  aliases: ["quiescence", "quiescent"],
  description: "Holding one's authority still and quiet so as not to be noticed.",
} as const satisfies WorldMechanic
