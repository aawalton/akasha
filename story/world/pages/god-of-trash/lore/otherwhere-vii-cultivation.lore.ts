import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereViiCultivation = {
  id: "01a0ea40-a95f-7103-b705-7fa1cbd14621",
  type: "page-type/lore",
  slug: "otherwhere-vii-cultivation",
  title: "Cultivation",
  world: "world/god-of-trash",
  about: "world-mechanic/otherwhere-vii-cultivation",
  facts: [
    {
      fact: "A mortal wakes to mana by a school's teaching, by a drop of mana potion, or by sensing it alone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Schools test the young for talent by scanning core size and how fast mana is drawn in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Schools take few grown mortals; a poor small school may take one who pays or brings worth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sensing mana alone needs stillness where mana is thick, and a true method or teacher.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mortal fake manuals teach nothing true; some, followed hard, harm the reader.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gathering is breathing mana in and pressing it into the core, an hour or more a day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Carrying weights while circulating mana, then running with them, trains the body and passages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beast meat, mana springs and potions speed gathering; potions leave impurities behind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Techniques and spells come from teachers or real tomes, which schools guard closely.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
