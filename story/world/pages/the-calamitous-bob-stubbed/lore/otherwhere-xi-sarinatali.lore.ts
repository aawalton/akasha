import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSarinatali = {
  id: "01a0ea86-00cc-72ac-8c69-fa2963fc1b2f",
  type: "page-type/lore",
  slug: "otherwhere-xi-sarinatali",
  title: "Sarinatali",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-sarinatali",
  facts: [
    {
      fact: "Sarinatali is a potion maker of Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sarinatali makes the essence of solace, an azure potion at 12 gold talents a vial.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One drop of Sarinatali's essence of solace keeps death away for hours.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Sarinatali brews in Helock, if the war has spared the trade.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
