import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxOgre = {
  id: "01a0ea36-4160-7e5f-9c3a-32b5796707a3",
  type: "page-type/lore",
  slug: "otherwhere-ix-ogre",
  title: "Ogre",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-ogre",
  facts: [
    {
      fact: "Ogres are massive, heavily built humanoids, strong enough that crushing one takes real power.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ogres and ogre-like beings are kept in the arena's prison pens, as captives or as fighters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One ogre-like kind has three eyes; a massive one sits caged beneath the arena, polishing boots.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wall parasites of the arena's lower caves have been known to smother and kill ogres.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
