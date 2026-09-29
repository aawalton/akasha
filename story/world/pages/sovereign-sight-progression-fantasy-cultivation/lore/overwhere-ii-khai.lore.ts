import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiKhai = {
  id: "01a0ed30-fcba-7ec8-b350-b9e77ff43ba1",
  type: "page-type/lore",
  slug: "overwhere-ii-khai",
  title: "Khai",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Khai is a Grim Company mercenary, second to Captain Harlan Vell.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Khai fights with a spear and is Second Depth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Khai's Talent is cast as Second Depth: Trail The Sun, and sets his spear on fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Khai was hurt in the Grim Company's fighting at Vale.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
