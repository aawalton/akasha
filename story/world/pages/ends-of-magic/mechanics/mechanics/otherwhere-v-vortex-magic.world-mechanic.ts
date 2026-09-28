import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVVortexMagic = {
  id: "01a0ea01-fcc6-7f9d-ba02-4d272c179d51",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-vortex-magic",
  title: "Magic of the Vortices",
  world: "world/ends-of-magic",
  aliases: ["vortices"],
  description: "The powerful magic of the great ocean vortices.",
} as const satisfies WorldMechanic
