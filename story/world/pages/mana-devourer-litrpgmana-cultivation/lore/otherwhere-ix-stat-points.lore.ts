import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxStatPoints = {
  id: "01a0ea38-ca06-7447-973a-8750bcfdf07e",
  type: "page-type/lore",
  slug: "otherwhere-ix-stat-points",
  title: "Stat Points",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-stat-points",
  facts: [
    {
      fact: "Each level up grants regular stat points to place in any attribute at will.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Level-up box: "[Level up! You have five unspent stat points.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The count in the box is the running total unspent, such as eleven, then seventeen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A level grants some five to nine regular points, most often about eight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Unspent points keep; they can be held for days and spent at need, even mid-fight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Spending a point takes hold at once and is felt in the body.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Regular points can go into Strength, Agility, Arcana, Constitution or Spirit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Regular points can be turned into Faith points by a god's Champion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Faith price of points rises with the Faith held: 15 to 16 Faith costs 80 points.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Class levels give their own attribute gains apart from spendable points.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Many put points toward breakpoints, as 100 in an attribute brings a milestone.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
