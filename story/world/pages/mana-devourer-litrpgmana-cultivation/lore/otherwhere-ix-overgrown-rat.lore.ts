import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxOvergrownRat = {
  id: "01a0ea39-fd42-734b-9279-4690c9208dd4",
  type: "page-type/lore",
  slug: "otherwhere-ix-overgrown-rat",
  title: "Overgrown Rat",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-overgrown-rat",
  facts: [
    {
      fact: "Overgrown rats are rats grown far past natural size, found in the depths under the Sun City arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They are weak prey, easily killed, and usually met in groups.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oversized rats are also fed to caged arena beasts, e.g. the three-headed cat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An overgrown rat carries a small core that can be devoured for a sliver of stats and mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Twenty-five mixed cave cores, rats among them, together raised mana capacity by about 900.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
