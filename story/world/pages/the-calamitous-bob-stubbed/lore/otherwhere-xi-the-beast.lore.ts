import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTheBeast = {
  id: "01a0ea90-86db-7f18-a941-0cf33cebc8eb",
  type: "page-type/lore",
  slug: "otherwhere-xi-the-beast",
  title: "The Beast",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-the-beast",
  facts: [
    {
      fact: "The Beast was a sea avatar of Octas, a chimera of a young abyssal octopus and a rock crusher.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Beast attacked Viv's ship on the voyage to Sardanal's Cradle, and she killed it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Beast is dead; Solfis keeps its head as a trophy.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
