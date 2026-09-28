import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxEleva = {
  id: "01a0ea39-fe75-7dd4-999f-d6269ad61ca3",
  type: "page-type/lore",
  slug: "otherwhere-ix-eleva",
  title: "Eleva",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-eleva",
  facts: [
    {
      fact: "Eleva is the eleventh world, the highest, and the paradise of the gods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The pantheon of Eleva draws its energy from the ten lower worlds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From Eleva the gods watch, gamble on and steer the other ten worlds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The gods above on Eleva appoint gods to divine offices on the lower worlds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Firrelia's zones serve a grand collective agenda imposed from the worlds above.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gods have begun leaving Eleva out of boredom; its watchers' interest is waning.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
