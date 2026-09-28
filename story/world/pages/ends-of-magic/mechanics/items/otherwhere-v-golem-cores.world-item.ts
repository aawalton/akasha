import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereVGolemCores = {
  id: "01a0e9fa-7a12-719c-9c7a-89bd29abda09",
  type: "page-type/world-item",
  slug: "otherwhere-v-golem-cores",
  title: "Golem Cores",
  world: "world/ends-of-magic",
  aliases: ["golem core"],
  description: "The magical heart of a golem.",
} as const satisfies WorldItem
