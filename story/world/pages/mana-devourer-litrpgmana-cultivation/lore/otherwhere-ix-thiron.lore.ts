import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxThiron = {
  id: "01a0ea38-826b-7fb8-bd5c-99fed2f6f836",
  type: "page-type/lore",
  slug: "otherwhere-ix-thiron",
  title: "Thiron",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-thiron",
  facts: [
    {
      fact: "Thiron, also called Thiror, is the third world.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The demon lord Elasar comes from Thiron.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Demons of Thiron back Elasar, and his family there would avenge his murder.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Thiron's demon houses are not gods, yet not quite mortals either.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elasar is terribly strong on Firrelia but nothing remarkable on Thiron.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Killing Elasar's servants or Elasar himself risks war with the demons of Thiron.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Krakens are found only on the third or fourth world.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
