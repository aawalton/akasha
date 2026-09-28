import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxGlaive = {
  id: "01a0ea42-c3b9-7a8f-b832-962330fe702c",
  type: "page-type/lore",
  slug: "otherwhere-ix-glaive",
  title: "Glaive",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-item/otherwhere-ix-glaive",
  facts: [
    {
      fact: 'Identify reads: "[Identify: Glaive. Long wooden pole affixed with curved, single-bladed tip.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Ideal for combat at four to eight feet.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The arena armoury lends iron glaives of unknown grade.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A glaive can be attuned to a mana its wielder holds, etching glowing runes into it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A glaive can be thrown like a javelin, and its haft used to bludgeon or deflect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A metal haft makes a glaive heavier but more durable than a wooden one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A glaive with a broken blade can still serve as a spear, or as a walking stick.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
