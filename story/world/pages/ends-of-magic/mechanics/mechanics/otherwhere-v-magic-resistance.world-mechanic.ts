import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVMagicResistance = {
  id: "01a0e9f7-bb0d-7767-9c8d-feb2ec3caf11",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-magic-resistance",
  title: "Magic Resistance",
  world: "world/ends-of-magic",
  aliases: ["resisting magic"],
  description: "A person's power to shrug off or fight free of spells cast on them.",
} as const satisfies WorldMechanic
