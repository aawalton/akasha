import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVEvesor = {
  id: "01a0e9fa-adf3-7d26-a3f2-7d7782ac8aa7",
  type: "page-type/lore",
  slug: "otherwhere-v-evesor",
  title: "Evesor",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-evesor",
  facts: [
    {
      fact: "Evesor is a Questor who leads the Aleph grid, a mage-heavy grid strong in long-range magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is a pale mage in black robes, a peerless wizard near Badud's power.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Evesor disrupts hostile magic; his apprentices know long-range disintegrate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is a terrible loser.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Aleph grid allies with Badud, lures new Questors, and has always warred with the Ashen Accord.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Evesor leads the Aleph grid, far from Giantsrest's continent.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
