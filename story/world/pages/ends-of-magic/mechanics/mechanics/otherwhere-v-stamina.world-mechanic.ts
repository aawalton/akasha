import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVStamina = {
  id: "01a0e9f9-efb5-7b93-a8b5-8ef4ccbd672e",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-stamina",
  title: "Stamina",
  world: "world/ends-of-magic",
  aliases: ["stamina resource", "Deepened Stamina", "Bottomless Stamina"],
  description: "A class resource of bodily power, shown as current over maximum.",
} as const satisfies WorldMechanic
