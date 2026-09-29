import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKobanis = {
  id: "01a0ea91-710e-7bd7-bebe-2d18a7599635",
  type: "page-type/lore",
  slug: "otherwhere-xi-kobanis",
  title: "Kobanis",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kobanis",
  facts: [
    {
      fact: "Kobanis was a figure of the Harrakan Remnant Empire in the south.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kobanis died when Harrak broke the Remnant Empire and took Frostway; Kobanis is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
