import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxHunters = {
  id: "01a0ea3c-5148-7bfb-b597-a87ddc7557c3",
  type: "page-type/lore",
  slug: "otherwhere-ix-hunters",
  title: "Hunters",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-hunters",
  facts: [
    {
      fact: "Hunters go deep into graded zones to capture monsters alive for the arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Taking a D Grade monster is work for elite hunters only.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hunting is deadly: four hunters died bagging one abominable bulleater from the Alzore Zone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Captured beasts are kept in holding pens and cages beneath the Sun City arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The pens have held a three-eyed ogre-like brute, a three-headed cat, and far stranger horrors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some arena monsters are not hunted but made by demons through blood magic and breeding.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Monsters in dark places shun torchlight unless noise draws them.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
