import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLancer = {
  id: "01a0ea8d-9aab-7024-95a4-086a28acfdc8",
  type: "page-type/lore",
  slug: "otherwhere-xi-lancer",
  title: "Prince Lancer",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-lancer",
  facts: [
    {
      fact: "Lancer was a prince of Enoria, raised by Constable Tarano, and known as the rabid prince.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lancer exiled the owl-like yries from their lands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lancer marched on Kazar in spring and drove Viv and its people to the Min Goles iron mines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Allied with yries and hadals, Viv crushed Lancer's army some ten days after his march began.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv executed Lancer by making him drink molten gold; Lancer is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
