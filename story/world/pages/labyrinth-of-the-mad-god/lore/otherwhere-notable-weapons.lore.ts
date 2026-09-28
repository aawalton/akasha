import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereNotableWeapons = {
  id: "01a0e9d2-c08d-76a4-a637-c8ac664d4530",
  type: "page-type/lore",
  slug: "otherwhere-notable-weapons",
  title: "Notable Weapons",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "An arena dagger is an Uncommon blade with the Eversharp modification.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Half-Length Scabbard halves a sheathed sword's length and can speed its draw.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Duelist's Short Sword is an Uncommon blade for dual wielders, eversharp and self-repairing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A frost venom dagger holds venom for three strikes before it runs dry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Self-returning throwing knives fly back when their owner sends intent into them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Wand of Healing is Rare and weaves its user's life mana into healing on contact.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Wand of Healing needs no charges but cannot store enough power for a mortal wound.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pirate bows gather wind mana along each nocked arrow for great speed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pirate whip of green cord bends and lashes like no leather and strips bare flesh.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pirate magitech cannons fire fireballs, acid globs and plain cannonballs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A defensive wand of coppery metal and silver bands raises barriers for its mage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A brass lightning bite locks onto a mount's fang and makes its bite crackle.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
