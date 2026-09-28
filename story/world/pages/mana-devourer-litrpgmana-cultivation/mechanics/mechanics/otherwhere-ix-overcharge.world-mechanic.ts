import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxOvercharge = {
  id: "01a0ea37-28a9-76f9-a706-454d2b8a199a",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-overcharge",
  title: "Overcharge",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["overcapacity"],
  description: "The empowered state of a body holding mana past its full capacity.",
} as const satisfies WorldMechanic
