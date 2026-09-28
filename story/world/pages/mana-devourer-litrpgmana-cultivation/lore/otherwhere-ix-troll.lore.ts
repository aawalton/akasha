import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxTroll = {
  id: "01a0ea37-83f8-7845-9feb-03ce51fd4f0d",
  type: "page-type/lore",
  slug: "otherwhere-ix-troll",
  title: "Troll",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-troll",
  facts: [
    {
      fact: "Trolls are big, strong folk with deep, slow voices.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Trolls speak in simple, broken phrases, such as “Imp make joke!” or “Imps argue...”",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Trolls do heavy labour under the Sun City arena, pulling carts and working the ramp winches.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Trolls work alongside imps and put up with their bickering.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
