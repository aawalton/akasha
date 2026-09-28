import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereTaltos = {
  id: "01a0e9a5-b2a3-7e93-9f2a-a49fa8cca3f7",
  type: "page-type/lore",
  slug: "otherwhere-taltos",
  title: "Taltos the Mad God",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Taltos is the Mad God, master of the Labyrinth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Taltos craves power and amusement and wants his contestants to put on a good show.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Taltos's runes are snaking glyphs, unlike the System's elegant geometry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Taltos rules through a pantheon of four lesser gods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The four lesser gods of Taltos are Slaughter, Spectacle, Suffering and Splendor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Herald of Slaughter is a lovely girl with blood-red wings who corrupts creatures.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A kiss from the Herald of Slaughter turns a beast into a Fallen monstrosity.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
