import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSaf = {
  id: "01a0ea88-523b-70ef-919c-a84a9b317e14",
  type: "page-type/lore",
  slug: "otherwhere-xi-saf",
  title: "Saf",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-saf",
  facts: [
    {
      fact: "Saf is a Viziman dock rat pressed into the Sheem army of Oleander's kingdom.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Saf was the first of Maranor's army to surrender on the Plain of the Gods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Saf is among the war prisoners held by New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
