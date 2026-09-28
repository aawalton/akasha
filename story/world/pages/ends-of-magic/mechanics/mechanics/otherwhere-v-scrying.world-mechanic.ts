import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVScrying = {
  id: "01a0e9ff-f3c7-7c88-bfdb-2065310cdcdc",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-scrying",
  title: "Scrying",
  world: "world/ends-of-magic",
  aliases: ["divination", "detection magic"],
  description: "Magical sight of distant places and hidden things.",
} as const satisfies WorldMechanic
