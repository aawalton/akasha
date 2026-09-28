import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVNuclearMagic = {
  id: "01a0ea01-3008-7f98-90ef-cb0bd33c2625",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-nuclear-magic",
  title: "Nuclear Magic",
  world: "world/ends-of-magic",
  aliases: ["fission magic", "fusion spells", "nuke spells", "Atomic Insights"],
  description: "Spells of fission and fusion.",
} as const satisfies WorldMechanic
