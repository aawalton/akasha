import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiTheDesertKingdom = {
  id: "01a0ed31-c669-7b4e-bb96-c25a8a20b5e6",
  type: "page-type/place",
  slug: "overwhere-iii-the-desert-kingdom",
  title: "The Desert Kingdom",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-navaru-desert",
      way: "Out past the border village's spike walls, northeast into the sands.",
    },
  ],
  facts: [
    {
      fact: "The desert kingdom is a small human realm on the southwest side of the Navaru desert.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies beyond the Velithra Dominion, many weeks south of the Wrenmark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A king rules it; rich bureaucrats grow fat while the people struggle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its central river has dried up; the soil is barren and the fields fail.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shepherds with dogs drive camels and goats across the dry land.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its people are tan-skinned; soldiers wear armor with skirt-like cloth and turban helms.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its guards are around level 50 and carry crossbows.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A border village of some fifty houses faces the anthill with spike walls and traps.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The capital has great walls and a central castle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A lush walled oasis garden at the castle's foot lies under a dome that spares birds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aenir, a red-haired foreign mage, is court mage and has vowed to restore the river.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "The kingdom and the antkin are at odds.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "A rich man shows off a courtship gem at a party before giving it to his intended.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "News of a magpie-worshipping cult in Velithra has reached even here.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
