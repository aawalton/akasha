import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxRarity = {
  id: "01a0ea41-22a2-7cf1-bb8c-cc30bb824ccc",
  type: "page-type/lore",
  slug: "otherwhere-ix-rarity",
  title: "Rarity",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-rarity",
  facts: [
    {
      fact: "Rarity runs, lowest to highest: Common, Rare, Epic, Legendary, Transcendent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At least one rarity exists above Transcendent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rarity labels mark passives, Path options, milestone choices and compound skills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A label shows in brackets after the name, as in "Robust I (Rare)" or "Increase (Legendary)".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rarity chiefly denotes how strong a choice is.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A rarer choice is not always the wiser; a Common option can suit a need best.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Unique" marks an ability born of a unique trait, as in "(Transcendent/Unique)".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A unique Path option is labelled with its source, as in "(Unique: Mana Manipulation)".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Legendary options are seldom seen; Transcendent ones far more seldom.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Class tiers resemble rarity in marking commonness, but do not mark a class's strength.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rarity differs from grade; grade is the G-to-SSS letter scale of mana, cores and skills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Faith store rewards roll on letter tiers; 15 points rolls a B tier reward.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Compatibility with a class sways the rarity of the skill or passive its unlock grants.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
