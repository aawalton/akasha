import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDragon = {
  id: "01a0e9f8-f7c6-711c-838b-63ee27eebf5f",
  type: "page-type/lore",
  slug: "otherwhere-v-dragon",
  title: "Dragon",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-dragon",
  facts: [
    {
      fact: "Dragons live on Davrar, and even Questors are often killed by them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The true dragons of past ages were among the greatest challenges on Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In ancient times dragons ruled whole realms, the dragondoms, later surpassed by Kalis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Dragons hoard wealth; "a dragon\'s hoard" means a great fortune.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Dragon\'s breath" and "dragonfire" are common curses.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Wake the dragon" and "baiting the dragon" mean needlessly provoking great danger.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giantsrest folk are said to hoard insight like dragons, passing it only to trusted heirs.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
