import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVMentalMagic = {
  id: "01a0e9f9-e5ca-7fda-990d-cc6bf1c43666",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-mental-magic",
  title: "Mental Magic",
  world: "world/ends-of-magic",
  aliases: ["mind magic", "mind control", "mental skills"],
  description: "Magic that reads, changes or commands the mind.",
} as const satisfies WorldMechanic
