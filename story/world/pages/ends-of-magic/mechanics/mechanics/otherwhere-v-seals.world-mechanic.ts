import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVSeals = {
  id: "01a0e9fa-d594-73c0-8008-c2356474a93b",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-seals",
  title: "Seals",
  world: "world/ends-of-magic",
  aliases: ["Seal"],
  description: "A great ancient machine of stone.",
} as const satisfies WorldMechanic
