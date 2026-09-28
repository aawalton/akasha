import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVWorship = {
  id: "01a0ea05-739b-79a2-908b-e3a2f9afdb5e",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-worship",
  title: "Worship",
  world: "world/ends-of-magic",
  aliases: ["religion", "the Deicide Concord"],
  description: "The worship of Davrar's gods.",
} as const satisfies WorldMechanic
