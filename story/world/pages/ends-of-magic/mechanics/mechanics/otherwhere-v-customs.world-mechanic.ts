import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVCustoms = {
  id: "01a0ea05-739b-796c-b3e8-488add8bddd1",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-customs",
  title: "Customs",
  world: "world/ends-of-magic",
  aliases: ["oaths", "salutes", "gladiatorial combat"],
  description: "The common customs of Davrar.",
} as const satisfies WorldMechanic
