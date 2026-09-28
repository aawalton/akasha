import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxOctopod = {
  id: "01a0ea37-3f7f-7855-8f41-dfdd60181684",
  type: "page-type/lore",
  slug: "otherwhere-ix-octopod",
  title: "Octopod",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-octopod",
  facts: [
    {
      fact: "Octopods are tentacled sea creatures native to Firrelia, primitive cousins of the kraken.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Krakens live only on higher worlds; Firrelia has octopods instead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Octopods are eaten, but they are nowhere near as tasty as kraken meat.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
