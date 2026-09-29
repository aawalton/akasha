import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiWitchcraft = {
  id: "01a0ea85-f5f3-7d48-b169-3ab71686dfd0",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-witchcraft",
  title: "Witchcraft",
  world: "world/the-calamitous-bob-stubbed",
  description: "Magic cast by instinct within a tradition rather than learned in a school.",
  aliases: ["Instinctive casting"],
} as const satisfies WorldMechanic
