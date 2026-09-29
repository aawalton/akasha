import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvLlewel = {
  id: "01a0ed27-7ca9-7299-a1bb-afc928e7ad13",
  type: "page-type/lore",
  slug: "overwhere-iv-llewel",
  title: "Llewel",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Llewel is an elf of the Feirelle Grove, oathbound to Loreleia Feirelle.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Llewel is a Chronomancer, a mage of time.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Llewel casts spells in an instant, with no delay at all.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Llewel's Stasis freezes a target in place, at a heavy cost in mana to hold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Llewel once reversed Vee's teleport in the instant she cast it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Llewel teleported Syl and Vee from Dhoggurum to the elves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Llewel is also an alchemist, and gave Syl alchemical solutions to enrich soil.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Llewel is betrothed to Princess Sylthaeryn Feirelle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Llewel once cast time spells on Syl at her asking, a trial that came to nothing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Llewel is cool and exacting, and greatly desires Keld's golems.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Llewel is now busy at the high elven court in Caelthal.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
