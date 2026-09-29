import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvYuzz = {
  id: "01a0ed2a-017b-7f1c-ae80-8e03643382dd",
  type: "page-type/lore",
  slug: "overwhere-iv-yuzz",
  title: "Yuzz",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Yuzz is a goblin woman and a master crafter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Identify shows Yuzz [Professional]: Goblin level 7, Omnicrafter level 42.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An Omnicrafter turns raw harvest into finished goods of every kind.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Yuzz made the leathers Syl once wore.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Yuzz is an old friend of Syl's from her days among the goblins.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Yuzz went with Garz's tribe into the cavern depths past Southbrook.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Garz stole Yuzz's storage pouch.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Syl took Yuzz, the chef Glooz and other goblin crafters to live on Tanglebay.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Yuzz is the unofficial leader of the goblins on Tanglebay.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Yuzz is warm, practical and proud of her work.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Yuzz is friends with the dwarf smith Sylbera.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Yuzz is now crafting on Tanglebay, still unable to work Vee's silk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
