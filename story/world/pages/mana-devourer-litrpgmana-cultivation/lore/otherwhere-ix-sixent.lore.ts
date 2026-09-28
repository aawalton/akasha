import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxSixent = {
  id: "01a0ea39-2821-77c5-b42f-996ab4670848",
  type: "page-type/lore",
  slug: "otherwhere-ix-sixent",
  title: "Sixent",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-sixent",
  facts: [
    {
      fact: "Sixent is the sixth world.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sixent is fully industrialised; trucks run on its roads.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serena knows what trucks are from Sixent.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
