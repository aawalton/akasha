import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVEdicts = {
  id: "01a0e9f4-c9f8-7c27-b143-eab51f422edd",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-edicts",
  title: "Edicts",
  world: "world/ends-of-magic",
  aliases: ["Edict"],
  description: "Spoken laws that a great caster imposes on reality.",
} as const satisfies WorldMechanic
