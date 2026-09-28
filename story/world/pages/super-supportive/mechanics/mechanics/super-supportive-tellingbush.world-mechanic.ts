import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveTellingbush = {
  id: "01a0e9f9-7733-707d-b559-5a514037524f",
  type: "page-type/world-mechanic",
  slug: "super-supportive-tellingbush",
  title: "Tellingbush",
  world: "world/super-supportive",
  aliases: ["knight tellingbush"],
  description: "An Artonan posting board and news network read through eye rings.",
} as const satisfies WorldMechanic
