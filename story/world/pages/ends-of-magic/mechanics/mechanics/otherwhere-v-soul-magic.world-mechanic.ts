import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVSoulMagic = {
  id: "01a0e9fa-7a13-7d12-b0ce-089e179bc720",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-soul-magic",
  title: "Soul Magic",
  world: "world/ends-of-magic",
  description: "Magic that works on a person's soul itself.",
} as const satisfies WorldMechanic
